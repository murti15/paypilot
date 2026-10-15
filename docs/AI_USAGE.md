# PayPilot — AI Usage and Verification Log

## 1. Objective

AI tools will be used to accelerate development while keeping engineering decisions, code review, testing, and final verification under the developer's responsibility.

## 2. Planned AI-Assisted Workflow

1. Clarify requirements, identify assumptions, and define acceptance criteria before implementation.
2. Break work into small features rather than generating the entire application in one step.
3. Use AI to explore implementation options and explain technical trade-offs.
4. Request focused unit and integration tests alongside business logic.
5. Review generated code for correctness, security, maintainability, and consistency with existing APIs.
6. Run relevant checks locally and inspect failures before accepting a change.
7. Use AI to help review role permissions, salary privacy, currency handling, and performance risks.
8. Record important prompts, decisions, rejected suggestions, and verification results.

## 3. Verification Principles

- AI-generated code is a proposal, not proof of correctness.
- Never claim tests, builds, or deployments passed unless they were actually executed and verified.
- Review security-sensitive code manually and test authorization boundaries.
- Check dependency compatibility and documentation before adopting recommendations.
- Keep commits small enough to review and understand.
- Do not include real employee information, credentials, or access tokens in AI prompts.

## 4. Prompt and Change Log

Record each significant AI-assisted change using this template:

- **Date and feature:**
- **Tool used:**
- **Prompt or task:**
- **Files changed:**
- **Suggestions accepted:**
- **Suggestions rejected and why:**
- **Tests or checks actually run:**
- **Results:**
- **Remaining risks or follow-up work:**

## 5. Transparency

This document describes the intended workflow. Actual prompts, implementation decisions, and verification outcomes will be recorded as development progresses. No test, build, security review, or deployment is considered complete solely because AI suggested it.