
import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app, prisma } from "../src/server.js";

afterAll(async () => {
    await prisma.$disconnect();
});

describe("PayPilot API", () => {
    it("returns the health status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
        expect(response.body.service).toBe("PayPilot API");
    });

    it("rejects invalid login data", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: "invalid-email", password: "" });

        expect(response.status).toBe(400);
    });

    it("rejects requests without a token", async () => {
        const response = await request(app).get("/api/employees");

        expect(response.status).toBe(401);
    });
});
