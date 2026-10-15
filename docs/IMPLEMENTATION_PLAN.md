# PayPilot — Implementation Plan

## Phase 0: Requirements and Design

- [ ] Define the problem, target user, scope, and exclusions.
- [ ] Document the initial system architecture.
- [ ] Document technical trade-offs and performance considerations.
- [ ] Document AI usage and reusable prompts.
- [ ] Create the final assessment acceptance checklist.

## Phase 1: Project Foundation

- [ ] Set up React, Vite, and TypeScript for the frontend.
- [ ] Set up Node.js, Express, and TypeScript for the backend.
- [ ] Configure root scripts and development tooling.
- [ ] Configure ESLint, formatting, and TypeScript checks.
- [ ] Add `.gitignore` and `.env.example`.
- [ ] Configure GitHub Actions for automated checks.
- [ ] Verify the initial installation and create a foundation commit.

## Phase 2: Database and Seed Data

- [ ] Configure PostgreSQL and Prisma.
- [ ] Define user, employee, and salary history models.
- [ ] Create and verify database migrations.
- [ ] Implement a deterministic seed script for exactly 10,000 synthetic employees.
- [ ] Verify unique employee numbers, valid currencies, and safe rerun behavior.

## Phase 3: Backend Development

- [ ] Add configuration validation and a health endpoint.
- [ ] Implement authentication and role-based authorization.
- [ ] Implement employee search, filtering, sorting, and pagination.
- [ ] Implement employee creation and profile updates.
- [ ] Implement salary updates with validation and transactional audit history.
- [ ] Implement currency-aware dashboard analytics.
- [ ] Add consistent API error handling.
- [ ] Write unit and integration tests for important business rules and permissions.

## Phase 4: Frontend Development

- [ ] Create the PayPilot application layout and responsive navigation.
- [ ] Build the dashboard and compensation analytics.
- [ ] Build the employee directory with search, filters, and pagination.
- [ ] Build employee details and authorized editing flows.
- [ ] Show salary history to authorized users.
- [ ] Ensure Viewer access does not expose individual salary values.
- [ ] Add loading, empty, validation, and error states.
- [ ] Test important frontend interactions.

## Phase 5: Quality and Security

- [ ] Run lint and TypeScript checks.
- [ ] Run backend and frontend tests.
- [ ] Verify production builds.
- [ ] Test authorization and salary-data privacy.
- [ ] Verify currency calculations and database transactions.
- [ ] Review secrets, dependencies, and error responses.
- [ ] Test critical end-to-end journeys where feasible.

## Phase 6: Deployment and Submission

- [ ] Deploy the frontend, backend API, and persistent database.
- [ ] Configure environment variables securely.
- [ ] Run database migrations and seed the deployed environment.
- [ ] Test the deployed application.
- [ ] Complete setup and usage documentation.
- [ ] Record a demo video showing actual working features.
- [ ] Review every assessment requirement against evidence.
- [ ] Reply to the original assessment email with the repository, live application, and demo video links.

## Git Commit Strategy

Use small, meaningful commits that reflect actual work, for example:

- `docs: define salary management requirements`
- `docs: document initial system architecture`
- `chore: scaffold React and Express workspaces`
- `feat(api): implement employee directory`
- `test(api): cover salary authorization`
- `feat(web): build compensation dashboard`

Only mark a task complete after implementing and verifying it.
