# PayPilot — Requirements

## 1. Goal
Build a salary management and compensation analytics application for an HR Manager managing 10,000 employees across multiple countries.

## 2. Primary User
The HR Manager maintains employee records, updates salary information, and reviews compensation data.

## 3. In Scope
- React and TypeScript web application.
- Employee directory with search, filters, sorting, and pagination.
- Employee details: employee ID, name, email, department, job title, country, employment status, salary currency, salary amount, and hire date.
- Salary updates with validation and an audit history containing previous salary, new salary, timestamp, and the authorized user.
- Dashboard analytics grouped by country, department, and currency.
- Node.js and Express REST API with request validation and consistent errors.
- PostgreSQL relational database.
- Repeatable seed script for exactly 10,000 synthetic employees.
- HR Manager and Viewer roles with backend-enforced permissions.
- Automated tests, CI checks, deployment, documentation, and a demo video.

## 4. Deliberate Exclusions
- Payroll processing and bank transfers: require external integrations.
- Country-specific tax calculations: require verified jurisdiction-specific rules.
- Live foreign-exchange conversion: avoid misleading totals across different currencies.
- Enterprise SSO and complex approval workflows: excluded to prioritize core salary-management features.

## 5. Security and Data Integrity
- Use synthetic employee data only.
- Never commit credentials or environment secrets.
- Validate all salary updates on the server.
- Restrict sensitive salary data through backend authorization, not UI hiding alone.
- Record salary changes in an auditable history.
- Store and aggregate monetary values with explicit currency codes.

## 6. Acceptance Criteria
- The seed process creates exactly 10,000 distinct employees.
- Employee search, filters, sorting, and pagination work through the API.
- Authorized HR Managers can update salaries and view audit history.
- Viewers cannot access individual salary data or perform write operations.
- Dashboard analytics are database-derived and currency-aware.
- Tests, type checks, lint, and production build pass.
- The application is deployed and demonstrated in a short video.