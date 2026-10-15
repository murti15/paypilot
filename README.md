# PayPilot

**Compensation Clarity. Smarter Decisions.**

PayPilot is a salary management and compensation analytics application designed for an HR Manager overseeing 10,000 employees across multiple countries.

## Current Status

The initial requirements and design documentation is being prepared. The application, automated tests, and deployment are not yet implemented or verified.

## Planned Technology Stack

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Testing:** Vitest, Supertest, React Testing Library
- **CI:** GitHub Actions

## Planned Features

- Employee directory with search, filters, sorting, and pagination.
- Employee profiles and validated salary updates.
- Salary-change audit history.
- Compensation dashboard with currency-aware analytics.
- HR Manager and Viewer roles with backend-enforced authorization.
- Repeatable seed script for exactly 10,000 synthetic employees.
- Automated tests, CI checks, and deployment documentation.

## Project Documentation

| Document | Purpose |
|---|---|
| [Requirements](docs/REQUIREMENTS.md) | Goal, scope, exclusions, and acceptance criteria |
| [Architecture](docs/ARCHITECTURE.md) | System design and component responsibilities |
| [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) | Development phases and milestones |
| [Technical Trade-offs](docs/TRADEOFFS.md) | Technology decisions and rationale |
| [AI Usage](docs/AI_USAGE.md) | AI-assisted development and verification process |
| [AI Prompt Library](docs/AI_PROMPTS.md) | Reusable prompts for coding, testing, and reviews |
| [Performance](docs/PERFORMANCE.md) | Performance design and measurement plan |
| [Acceptance Checklist](docs/ACCEPTANCE_CHECKLIST.md) | Assessment verification checklist |
| [Demo Script](docs/DEMO_SCRIPT.md) | Planned demonstration flow |

## Security

- Use synthetic employee data only.
- Never commit credentials, tokens, or `.env` files.
- Validate requests and enforce authorization on the backend.
- Do not expose individual salary values to unauthorized users.
- Keep compensation analytics grouped by currency unless a documented conversion method is implemented.

## Local Development

Application installation, database setup, seeding, testing, and deployment instructions will be added and verified as implementation progresses.

## Assessment Delivery

Before submission, this README will be updated with verified setup instructions, test results, the deployed application URL, and the demo video link.

**Important:** Planned functionality must not be considered complete until it has been implemented and tested.