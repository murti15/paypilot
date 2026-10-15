# PayPilot — Technical Trade-offs

This document records the initial technical decisions for PayPilot. Decisions may be revised when implementation or testing provides new evidence.

## 1. PostgreSQL vs SQLite

**Decision:** Use PostgreSQL with Prisma.

**Reasoning:** Employee records, user permissions, and salary history are related data. PostgreSQL provides relational constraints, transactions, indexing, and aggregation capabilities suitable for the application.

**Trade-off:** PostgreSQL requires additional local and deployment configuration compared with SQLite.

## 2. React and Node.js with TypeScript

**Decision:** Use React with Vite for the frontend and Node.js with Express for the backend, both written in TypeScript.

**Reasoning:** This aligns with the role's React and Node.js requirements and provides type checking across the application.

**Trade-off:** TypeScript and tooling require additional setup compared with plain JavaScript.

## 3. Layered Backend Architecture

**Decision:** Separate routes, middleware, controllers, services, and data access.

**Reasoning:** Salary validation, authorization, and audit history are important business rules that need independent testing.

**Trade-off:** The structure creates more files. Abstractions should be introduced only when they improve clarity or testability.

## 4. Backend-Enforced Role Permissions

**Decision:** Enforce HR Manager and Viewer permissions in the API.

**Reasoning:** Hiding salary columns in React is insufficient because users can call APIs directly. Sensitive fields must not be returned to unauthorized users.

**Trade-off:** API responses and queries may differ depending on the user's permissions.

## 5. Currency-Aware Compensation Analytics

**Decision:** Store an explicit ISO currency code for every salary and group monetary totals by currency.

**Reasoning:** Adding salaries denominated in INR, USD, and EUR without conversion produces misleading totals.

**Trade-off:** The dashboard may show separate currency totals instead of a single organization-wide monetary figure.

## 6. Synthetic Seed Data

**Decision:** Generate exactly 10,000 synthetic employee records using repeatable seed logic.

**Reasoning:** Reviewers need realistic data volume to evaluate search, pagination, and analytics without exposing real employee information.

**Trade-off:** The seed process must define how reruns avoid duplicate records and how existing test data is handled.

## 7. Salary Audit History

**Decision:** Record the previous salary, new salary, currency, authorized user, and change timestamp.

**Reasoning:** Compensation changes should be traceable. The salary update and audit entry should be committed in a single database transaction.

**Trade-off:** Every salary change adds an audit record, increasing storage and query requirements.

## 8. Focused MVP Scope

**Decision:** Defer payroll execution, bank transfers, country-specific tax calculations, live foreign-exchange conversion, enterprise SSO, and complex approval workflows.

**Reasoning:** These features introduce external integrations or jurisdiction-specific complexity. The assessment should first demonstrate reliable employee management, salary updates, security, and analytics.

**Trade-off:** PayPilot will demonstrate core salary management rather than replace a complete payroll platform.