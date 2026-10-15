
import "dotenv/config";
import { app, prisma } from "./server.js";

const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, () => {
    console.log(`PayPilot API listening on port ${port}`);
});

function shutdown() {
    server.close(() => {
        void prisma.$disconnect().finally(() => {
            process.exit(0);
        });
    });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
