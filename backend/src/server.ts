
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();

type AuthRequest = express.Request & {
    auth?: { userId: string; role: string };
};

app.use(helmet());
app.use(
    cors({
        origin: (process.env.FRONTEND_URL || "http://localhost:5173")
            .split(",")
            .map((value) => value.trim()),
    }),
);
app.use(express.json({ limit: "1mb" }));

function authenticate(
    req: AuthRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        res.status(503).json({ error: "Authentication is not configured" });
        return;
    }

    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authentication required" });
        return;
    }

    try {
        const payload = jwt.verify(header.slice(7), secret);

        if (
            typeof payload === "string" ||
            typeof payload.userId !== "string" ||
            typeof payload.role !== "string"
        ) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }

        req.auth = { userId: payload.userId, role: payload.role };
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

function requireHR(
    req: AuthRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    if (!["ADMIN", "HR"].includes(req.auth?.role ?? "")) {
        res.status(403).json({ error: "HR access required" });
        return;
    }

    next();
}

const asyncHandler =
    (handler: express.RequestHandler): express.RequestHandler =>
        (req, res, next) => {
            Promise.resolve(handler(req, res, next)).catch(next);
        };

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "PayPilot API",
        timestamp: new Date().toISOString(),
    });
});

app.post(
    "/api/auth/login",
    asyncHandler(async (req, res) => {
        const parsed = z
            .object({
                email: z.string().email().transform((value) => value.toLowerCase()),
                password: z.string().min(1).max(200),
            })
            .safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({ error: "Valid email and password are required" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
        });

        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const valid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
        );

        const secret = process.env.JWT_SECRET;

        if (!valid || !secret || secret.length < 32) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            secret,
            { expiresIn: "8h" },
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    }),
);

app.get(
    "/api/dashboard",
    authenticate,
    asyncHandler(async (_req, res) => {
        const [
            totalEmployees,
            activeEmployees,
            departmentGroups,
            countryGroups,
            salaryGroups,
        ] = await Promise.all([
            prisma.employee.count(),
            prisma.employee.count({ where: { employmentStatus: "ACTIVE" } }),
            prisma.employee.groupBy({
                by: ["department"],
                _count: { _all: true },
            }),
            prisma.employee.groupBy({
                by: ["country"],
                _count: { _all: true },
            }),
            prisma.employee.groupBy({
                by: ["currency"],
                _count: { _all: true },
                _avg: { baseSalary: true },
                _sum: { baseSalary: true },
            }),
        ]);

        res.json({
            totalEmployees,
            activeEmployees,
            departmentCount: departmentGroups.length,
            countryCount: countryGroups.length,
            compensationByCurrency: salaryGroups.map((group) => ({
                currency: group.currency,
                employeeCount: group._count._all,
                averageSalary: group._avg.baseSalary?.toString() ?? "0",
                totalBaseSalary: group._sum.baseSalary?.toString() ?? "0",
            })),
            employeesByDepartment: departmentGroups.map((group) => ({
                department: group.department,
                count: group._count._all,
            })),
            employeesByCountry: countryGroups.map((group) => ({
                country: group.country,
                count: group._count._all,
            })),
        });
    }),
);

app.get(
    "/api/employees",
    authenticate,
    asyncHandler(async (req, res) => {
        const page = Math.max(1, Number(req.query.page) || 1);
        const pageSize = Math.min(
            100,
            Math.max(1, Number(req.query.pageSize) || 20),
        );

        const search = String(req.query.search ?? "").trim();
        const department = String(req.query.department ?? "").trim();
        const country = String(req.query.country ?? "").trim();
        const status = String(req.query.status ?? "").trim();

        if (status && !["ACTIVE", "ON_LEAVE", "INACTIVE"].includes(status)) {
            res.status(400).json({ error: "Invalid employment status" });
            return;
        }

        const where: Prisma.EmployeeWhereInput = {
            ...(search
                ? {
                    OR: [
                        { firstName: { contains: search, mode: "insensitive" } },
                        { lastName: { contains: search, mode: "insensitive" } },
                        { employeeCode: { contains: search, mode: "insensitive" } },
                        { email: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {}),
            ...(department ? { department } : {}),
            ...(country ? { country } : {}),
            ...(status
                ? {
                    employmentStatus: status as
                        | "ACTIVE"
                        | "ON_LEAVE"
                        | "INACTIVE",
                }
                : {}),
        };

        const [total, employees] = await Promise.all([
            prisma.employee.count({ where }),
            prisma.employee.findMany({
                where,
                orderBy: { employeeCode: "asc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
                select: {
                    id: true,
                    employeeCode: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    department: true,
                    designation: true,
                    country: true,
                    currency: true,
                    baseSalary: true,
                    bonus: true,
                    employmentStatus: true,
                    joiningDate: true,
                },
            }),
        ]);

        res.json({
            data: employees.map((employee) => ({
                ...employee,
                baseSalary: employee.baseSalary.toString(),
                bonus: employee.bonus.toString(),
            })),
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    }),
);

app.get(
    "/api/employees/:id",
    authenticate,
    asyncHandler(async (req, res) => {
        const employee = await prisma.employee.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                employeeCode: true,
                firstName: true,
                lastName: true,
                email: true,
                department: true,
                designation: true,
                country: true,
                currency: true,
                baseSalary: true,
                bonus: true,
                employmentStatus: true,
                joiningDate: true,
                salaryChanges: {
                    orderBy: { createdAt: "desc" },
                    take: 20,
                    select: {
                        id: true,
                        changedBy: true,
                        previousSalary: true,
                        newSalary: true,
                        reason: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!employee) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }

        res.json({
            ...employee,
            baseSalary: employee.baseSalary.toString(),
            bonus: employee.bonus.toString(),
            salaryChanges: employee.salaryChanges.map((change) => ({
                ...change,
                previousSalary: change.previousSalary.toString(),
                newSalary: change.newSalary.toString(),
            })),
        });
    }),
);

app.patch(
    "/api/employees/:id/salary",
    authenticate,
    requireHR,
    asyncHandler(async (req: AuthRequest, res) => {
        const parsed = z
            .object({
                baseSalary: z.number().finite().positive().max(1_000_000_000),
                reason: z.string().trim().min(3).max(500),
            })
            .safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({
                error: "A positive salary and a reason are required",
            });
            return;
        }

        const result = await prisma.$transaction(async (tx) => {
            const employee = await tx.employee.findUnique({
                where: { id: req.params.id },
            });

            if (!employee) return null;

            const updated = await tx.employee.update({
                where: { id: employee.id },
                data: {
                    baseSalary: new Prisma.Decimal(parsed.data.baseSalary),
                },
            });

            await tx.salaryAudit.create({
                data: {
                    employeeId: employee.id,
                    changedBy: req.auth!.userId,
                    previousSalary: employee.baseSalary,
                    newSalary: updated.baseSalary,
                    reason: parsed.data.reason,
                },
            });

            return updated;
        });

        if (!result) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }

        res.json({
            id: result.id,
            baseSalary: result.baseSalary.toString(),
            message: "Salary updated and audit recorded",
        });
    }),
);

app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use(
    (
        error: unknown,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error("API error:", error);
        res.status(500).json({ error: "Internal server error" });
    },
);

export { app, prisma };
