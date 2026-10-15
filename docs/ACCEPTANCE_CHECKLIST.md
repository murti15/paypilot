# PayPilot — Assessment Acceptance Checklist

**Status:** Initial checklist. Items must remain unchecked until implementation or supporting evidence verifies them.

## 1. Requirements and Engineering Process

- [ ] Requirements document defines the goal, scope, exclusions, and rationale.
- [ ] Architecture and technical trade-offs are documented.
- [ ] Implementation plan and performance considerations are documented.
- [ ] AI-assisted development and verification are recorded honestly.
- [ ] Git history contains meaningful incremental commits.

## 2. Database and Seed Data

- [ ] PostgreSQL schema and migrations are implemented.
- [ ] Database setup works from a clean environment.
- [ ] Seed script creates exactly 10,000 distinct synthetic employees.
- [ ] Employee numbers and work emails satisfy uniqueness constraints.
- [ ] Seed rerun behavior is documented and verified.

## 3. Backend Functionality

- [ ] Employee API supports search, filtering, sorting, and bounded pagination.
- [ ] Request data is validated on the server.
- [ ] Employee records can be created and updated by authorized users.
- [ ] Salary updates record previous and new values in audit history.
- [ ] Salary changes and audit entries are handled transactionally.
- [ ] Dashboard analytics are derived from database queries.
- [ ] Monetary totals are grouped by currency unless documented conversion is implemented.
- [ ] API errors are consistent and do not expose sensitive implementation details.

## 4. Authentication and Privacy

- [ ] Authentication is implemented.
- [ ] HR Manager and Viewer roles are enforced by the backend.
- [ ] Viewer API responses do not expose individual salary values.
- [ ] Viewer write attempts are rejected.
- [ ] Users cannot grant themselves privileged roles.
- [ ] Secrets and real employee information are excluded from Git history.

## 5. Frontend Functionality

- [ ] Dashboard displays relevant employee and compensation summaries.
- [ ] Employee directory supports search, filtering, sorting, and pagination.
- [ ] Employee details and authorized edit flows work.
- [ ] Salary updates display validation feedback and recorded history.
- [ ] Loading, empty, validation, unauthorized, forbidden, and error states are handled.
- [ ] Responsive layout and accessibility basics are checked.

## 6. Automated Quality Checks

- [ ] Lint passes.
- [ ] TypeScript checks pass.
- [ ] Unit tests pass.
- [ ] API integration tests pass.
- [ ] Frontend behavior tests pass.
- [ ] Critical end-to-end tests pass if implemented.
- [ ] Production build passes.
- [ ] GitHub Actions runs the configured checks.
- [ ] Dependency and secret hygiene are reviewed.

## 7. Deployment and Final Submission

- [ ] README contains verified installation, configuration, and usage instructions.
- [ ] Application and API are deployed and smoke-tested.
- [ ] Persistent database configuration is verified.
- [ ] Demo video shows actual working application behavior.
- [ ] Repository, live application, and demo links are ready.
- [ ] Original assessment email is answered with the required links.

## Verification Rule

Documentation alone does not prove that a feature works. Mark a checkbox complete only after implementation and appropriate verification. Record evidence or relevant test results where practical.