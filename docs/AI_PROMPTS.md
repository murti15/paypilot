# PayPilot — AI Prompt Library

## Purpose

This file contains reusable prompts for AI-assisted development. These are prompt templates, not evidence that a task has already been implemented or verified. Actual usage and results must be recorded in `AI_USAGE.md`.

## 1. Feature Implementation

> Inspect the existing PayPilot codebase before making changes. Implement the requested feature using the current architecture and TypeScript conventions. Explain the proposed changes first. Keep the change focused, handle expected errors, and add tests for success, validation failures, and relevant edge cases. Do not modify unrelated files. After implementation, list changed files, commands actually run, results, and remaining risks.

## 2. API and Authorization Review

> Review the specified API endpoints for authentication, role-based authorization, input validation, unsafe error responses, and sensitive salary-data exposure. Verify that authorization is enforced on the server. Check whether a Viewer can obtain individual salary fields or perform unauthorized writes. Identify concrete code locations and propose focused fixes. Add regression tests for confirmed issues. Do not claim a security issue is fixed until the relevant tests have been run.

## 3. Test Design

> For the specified PayPilot feature, identify positive cases, negative cases, boundary conditions, and permission checks before writing tests. Follow the existing test framework. For salary operations, consider invalid amounts, currency validation, audit-history consistency, transaction failures, and Viewer permissions. Run the relevant tests and report the actual output. Do not invent test results.

## 4. Database and Seed Review

> Review the Prisma schema, migrations, and seed logic. Verify employee-number and email uniqueness, valid currency codes, relationships, and salary-history integrity. Check that the seed process creates exactly 10,000 distinct synthetic employees and has clearly defined rerun behavior. Add tests or verification commands where appropriate. Report only checks that were actually performed.

## 5. Performance Review

> Review employee search, filtering, sorting, pagination, and dashboard analytics for a dataset of 10,000 employees. Check for unbounded queries, unnecessary database calls, missing indexes, and loading all employee records into application memory. Recommend measurements and query-plan checks. Do not claim performance targets are met without measured evidence.

## 6. Code Review

> Review this change for correctness, maintainability, type safety, security, accessibility, and consistency with the existing codebase. Prioritize concrete defects over style preferences. Explain the impact of each finding and recommend minimal fixes. Identify missing tests. Do not rewrite unrelated modules.

## 7. Final Assessment Audit

> Compare the current repository against `docs/ACCEPTANCE_CHECKLIST.md` and the assessment requirements. Classify every item as verified, incomplete, or not implemented. For each verified item, identify supporting code, test output, deployment evidence, or a recording. Documentation alone does not prove that a feature works. List the highest-priority remaining gaps.

## Prompt Usage Record

For every significant use of these templates, record the date, feature, actual prompt, files changed, decisions made, tests run, results, and remaining risks in `AI_USAGE.md`.