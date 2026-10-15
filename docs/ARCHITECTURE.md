# PayPilot — System Architecture

## 1. Overview

PayPilot is a salary management and compensation analytics application designed for an HR Manager overseeing 10,000 employees across multiple countries.

The application follows a client-server architecture. The React frontend communicates with a Node.js REST API, which validates requests, enforces permissions, applies business rules, and accesses PostgreSQL.

## 2. Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React, Vite, TypeScript | Dashboard, employee directory, salary forms |
| API | Node.js, Express, TypeScript | REST endpoints and request handling |
| Validation | Zod | Validate request parameters and payloads |
| Database | PostgreSQL | Employee, user, salary and audit records |
| ORM | Prisma | Database queries and migrations |
| Backend tests | Vitest, Supertest | Business rules and API behavior |
| Frontend tests | Vitest, React Testing Library | Component and interaction behavior |
| CI | GitHub Actions | Automated quality checks |

## 3. High-Level Architecture

```text
HR Manager / Viewer
        |
        v
React Web Application
        |
        v
Express REST API
        |
        v
Authentication & Authorization
        |
        v
Request Validation
        |
        v
Routes and Controllers
        |
        v
Service / Business Logic
        |
        v
Prisma Data Access Layer
        |
        v
PostgreSQL Database
```

The frontend never accesses the database directly. All sensitive operations pass through the backend API.

## 4. Backend Organization

The backend will use the following separation of responsibilities:

- **Routes:** Define API endpoints and attach middleware.
- **Middleware:** Handle authentication, role authorization, and common request processing.
- **Controllers:** Translate HTTP requests into service calls and format responses.
- **Services:** Implement business rules, including salary validation and audit behavior.
- **Data access:** Use Prisma to query and update the database.
- **Validation:** Reject invalid request data before business logic executes.
- **Error handling:** Return consistent, safe error responses without exposing internal details.

## 5. Core Data Model

### User
- ID
- Email
- Password hash
- Role: HR_MANAGER or VIEWER
- Created timestamp

### Employee
- ID
- Employee number
- Name
- Work email
- Department
- Job title
- Country
- Employment status
- Salary amount
- ISO currency code
- Hire date
- Created and updated timestamps

### Salary History
- ID
- Employee ID
- Previous salary amount
- New salary amount
- Currency code
- Changed by user ID
- Change timestamp

Database constraints will protect unique employee numbers and work emails. Salary updates and their corresponding history records will be written in one transaction.

## 6. Authorization and Privacy

- Authentication identifies the current user.
- HR Manager permissions are enforced by the backend for salary-sensitive operations.
- Viewer access is restricted to permitted employee information and non-sensitive summaries.
- Individual salary values must not be included in Viewer API responses.
- The backend must reject unauthorized writes even if a user manually calls an API.
- Privileged demo accounts must be provisioned safely; users cannot grant themselves HR Manager privileges through public registration.

## 7. API Design

Planned endpoints include:

- `POST /api/auth/login` — authenticate a user.
- `GET /api/employees` — search, filter, sort, and paginate employees.
- `GET /api/employees/:id` — retrieve an authorized employee profile.
- `POST /api/employees` — create an employee.
- `PATCH /api/employees/:id` — update permitted employee information.
- `PATCH /api/employees/:id/salary` — update salary and record audit history.
- `GET /api/analytics/summary` — retrieve authorized dashboard summaries.
- `GET /api/health` — check API health.

These endpoints are proposed contracts and will be confirmed during implementation.

## 8. Performance and Data Integrity

- Use server-side pagination with a bounded page size.
- Apply database indexes based on actual search and filter requirements.
- Perform aggregate calculations in PostgreSQL instead of loading all employees into Node.js.
- Validate sort fields and filter parameters.
- Keep totals grouped by currency; do not add different currencies without a documented conversion process.
- Use synthetic seed data to create exactly 10,000 distinct employee records.
- Verify query behavior and performance with representative data before making performance claims.

## 9. Testing and Delivery

The project will include unit tests for business rules, API integration tests for validation and authorization, and frontend tests for important interactions. Critical end-to-end flows will be tested where feasible.

GitHub Actions will run the configured lint, type-check, test, and build commands. Deployment will use a persistent PostgreSQL database and environment-based configuration.

## 10. Scope Limitations

Payroll execution, bank transfers, jurisdiction-specific tax calculations, live foreign-exchange conversion, enterprise SSO, and complex approval workflows are outside the initial assessment MVP.

This architecture is the initial design. Implementation details may change when supported by testing or practical constraints.