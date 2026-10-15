
import { PrismaClient, EmploymentStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const TOTAL_EMPLOYEES = 10_000;
const BATCH_SIZE = 500;

const departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Sales",
    "Marketing",
    "Operations",
    "Customer Support",
    "Product",
    "Legal",
    "IT",
];

const designations = [
    "Software Engineer",
    "Senior Engineer",
    "Team Lead",
    "Manager",
    "Analyst",
    "Specialist",
    "Director",
];

const locations = [
    { country: "India", currency: "INR", min: 600_000, max: 3_000_000 },
    { country: "United States", currency: "USD", min: 65_000, max: 190_000 },
    { country: "United Kingdom", currency: "GBP", min: 40_000, max: 120_000 },
    { country: "Germany", currency: "EUR", min: 45_000, max: 130_000 },
    { country: "Singapore", currency: "SGD", min: 50_000, max: 150_000 },
];

const firstNames = [
    "Aarav", "Priya", "Rohan", "Ananya", "Vikram",
    "Neha", "Arjun", "Isha", "Kabir", "Meera",
    "Rahul", "Sana", "Aditya", "Diya", "Karan",
    "Aisha", "Dev", "Maya", "Ibrahim", "Sofia",
];

const lastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Gupta",
    "Reddy", "Mehta", "Shah", "Verma", "Rao",
    "Das", "Malhotra", "Kapoor", "Joshi", "Nair",
    "Brown", "Wilson", "Miller",
];

async function seedEmployees() {
    for (let start = 0; start < TOTAL_EMPLOYEES; start += BATCH_SIZE) {
        const count = Math.min(BATCH_SIZE, TOTAL_EMPLOYEES - start);

        const employees = Array.from({ length: count }, (_, offset) => {
            const index = start + offset;
            const location = locations[index % locations.length];
            const salaryRange = location.max - location.min;
            const baseSalary =
                location.min + ((index * 7919) % salaryRange);

            const employmentStatus =
                index % 40 === 0
                    ? EmploymentStatus.INACTIVE
                    : index % 25 === 0
                        ? EmploymentStatus.ON_LEAVE
                        : EmploymentStatus.ACTIVE;

            return {
                employeeCode: `PP${String(index + 1).padStart(6, "0")}`,
                firstName: firstNames[index % firstNames.length],
                lastName: lastNames[(index * 7) % lastNames.length],
                email: `employee${index + 1}@example.com`,
                department: departments[index % departments.length],
                designation: designations[index % designations.length],
                country: location.country,
                currency: location.currency,
                baseSalary,
                bonus: Math.round(baseSalary * ((index % 16) / 100)),
                employmentStatus,
                joiningDate: new Date(
                    Date.UTC(2018 + (index % 8), index % 12, 1),
                ),
            };
        });

        await prisma.employee.createMany({
            data: employees,
            skipDuplicates: true,
        });

        console.log(`Processed batch: ${start + 1}–${start + count}`);
    }
}

async function seedDemoHR() {
    const password = process.env.DEMO_HR_PASSWORD;

    if (!password || password.length < 12) {
        throw new Error(
            "Set DEMO_HR_PASSWORD to a password of at least 12 characters before seeding.",
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
        where: { email: "hr@paypilot.demo" },
        update: {
            passwordHash,
            role: UserRole.HR,
        },
        create: {
            email: "hr@paypilot.demo",
            passwordHash,
            role: UserRole.HR,
        },
    });

    console.log("Demo HR account configured.");
}

async function main() {
    await seedEmployees();
    await seedDemoHR();

    const employeeCount = await prisma.employee.count();
    console.log(`Seed finished. Total employees in database: ${employeeCount}`);
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
