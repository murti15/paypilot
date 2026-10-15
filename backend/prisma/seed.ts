
import { PrismaClient, EmploymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

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

const roles = [
    "Software Engineer",
    "Senior Engineer",
    "Team Lead",
    "Manager",
    "Analyst",
    "Specialist",
    "Director",
];

const locations = [
    { country: "India", currency: "INR", min: 600000, max: 3000000 },
    { country: "United States", currency: "USD", min: 65000, max: 190000 },
    { country: "United Kingdom", currency: "GBP", min: 40000, max: 120000 },
    { country: "Germany", currency: "EUR", min: 45000, max: 130000 },
    { country: "Singapore", currency: "SGD", min: 50000, max: 150000 },
];

const firstNames = [
    "Aarav", "Priya", "Rohan", "Ananya", "Vikram", "Neha",
    "Arjun", "Isha", "Kabir", "Meera", "Rahul", "Sana",
    "Aditya", "Diya", "Karan", "Aisha", "Dev", "Maya",
    "Ibrahim", "Sofia",
];

const lastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Gupta", "Reddy",
    "Mehta", "Shah", "Verma", "Rao", "Das", "Malhotra",
    "Kapoor", "Joshi", "Nair", "Brown", "Wilson", "Miller",
];

async function main() {
    const batchSize = 500;
    const totalEmployees = 10_000;

    for (let start = 0; start < totalEmployees; start += batchSize) {
        const batch = Array.from(
            { length: Math.min(batchSize, totalEmployees - start) },
            (_, offset) => {
                const index = start + offset;
                const location = locations[index % locations.length];
                const baseSalary =
                    Math.round(
                        location.min +
                        ((index * 7919) % (location.max - location.min)),
                    );

                return {
                    employeeCode: `PP${String(index + 1).padStart(6, "0")}`,
                    firstName: firstNames[index % firstNames.length],
                    lastName: lastNames[(index * 7) % lastNames.length],
                    email: `employee${index + 1}@example.com`,
                    department: departments[index % departments.length],
                    designation: roles[index % roles.length],
                    country: location.country,
                    currency: location.currency,
                    baseSalary,
                    bonus: Math.round(baseSalary * ((index % 16) / 100)),
                    employmentStatus:
                        index % 25 === 0
                            ? EmploymentStatus.ON_LEAVE
                            : index % 40 === 0
                                ? EmploymentStatus.INACTIVE
                                : EmploymentStatus.ACTIVE,
                    joiningDate: new Date(
                        Date.UTC(2018 + (index % 8), index % 12, 1),
                    ),
                };
            },
        );

        await prisma.employee.createMany({
            data: batch,
            skipDuplicates: true,
        });

        console.log(`Processed employees through ${start + batch.length}`);
    }

    console.log("Seed completed. Target: 10,000 employees.");
}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
