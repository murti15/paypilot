
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = Number(process.env.PORT) || 4000;

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(helmet());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "PayPilot API",
        timestamp: new Date().toISOString(),
    });
});

app.use((_req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

app.listen(port, () => {
    console.log(`PayPilot API listening on port ${port}`);
});

export default app;
