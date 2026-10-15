
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'HR', 'MANAGER', 'EMPLOYEE');
CREATE TYPE "EmploymentStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'INACTIVE');

CREATE TABLE "Employee" (
  "id" TEXT NOT NULL,
  "employeeCode" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "designation" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "baseSalary" DECIMAL(14,2) NOT NULL,
  "bonus" DECIMAL(14,2) NOT NULL DEFAULT 0,
  "employmentStatus" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
  "joiningDate" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
  "employeeId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SalaryAudit" (
  "id" TEXT NOT NULL,
  "employeeId" TEXT NOT NULL,
  "changedBy" TEXT NOT NULL,
  "previousSalary" DECIMAL(14,2) NOT NULL,
  "newSalary" DECIMAL(14,2) NOT NULL,
  "reason" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SalaryAudit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");
CREATE INDEX "Employee_department_idx" ON "Employee"("department");
CREATE INDEX "Employee_country_idx" ON "Employee"("country");
CREATE INDEX "Employee_employmentStatus_idx" ON "Employee"("employmentStatus");
CREATE INDEX "SalaryAudit_employeeId_createdAt_idx" ON "SalaryAudit"("employeeId", "createdAt");

ALTER TABLE "User"
ADD CONSTRAINT "User_employeeId_fkey"
FOREIGN KEY ("employeeId") REFERENCES "Employee"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "SalaryAudit"
ADD CONSTRAINT "SalaryAudit_employeeId_fkey"
FOREIGN KEY ("employeeId") REFERENCES "Employee"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
