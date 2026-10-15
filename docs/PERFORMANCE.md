# PayPilot — Performance Considerations

## 1. Objective

PayPilot is designed to support employee search and compensation analytics for 10,000 employees across multiple countries. Performance decisions will be validated through testing rather than assumptions.

## 2. Employee Directory

- Use server-side pagination with a default page size of 25 and a maximum of 100 records per request.
- Apply search, filtering, and sorting in the database rather than downloading the full employee dataset to the browser.
- Validate and allowlist sortable columns and filter parameters.
- Add database indexes based on actual query patterns, including employee number, department, country, and employment status.
- Return only the fields the current user's role is authorized to access.

## 3. Dashboard Analytics

- Perform aggregation queries in PostgreSQL rather than loading every employee record into Node.js memory.
- Group salary totals and compensation statistics by ISO currency code.
- Return only the summary data required by dashboard components.
- Avoid adding a caching layer until measurements demonstrate a need and invalidation behavior is defined.

## 4. Database Integrity

- Use unique constraints for employee numbers and work email addresses.
- Use database transactions for salary updates and corresponding audit-history records.
- Use appropriate indexes for common lookup and filtering patterns.
- Review query plans for expensive queries using `EXPLAIN ANALYZE` when available.

## 5. Seed Data and Verification

- Generate exactly 10,000 distinct synthetic employee records.
- Use repeatable generation so test results can be reproduced.
- Verify employee counts, unique identifiers, currency distribution, and seed rerun behavior.
- Test directory and analytics queries against the seeded dataset.

## 6. Performance Measurement Plan

Once the application is implemented:

1. Record the local or deployed environment used for testing.
2. Measure employee-list API response times with representative filters.
3. Check database query plans and index usage.
4. Measure analytics query behavior against the seeded dataset.
5. Record actual results and investigate slow queries.
6. Re-run relevant tests after performance changes.

## 7. Current Limitations

No performance benchmark or load-test result is claimed at this stage. Performance conclusions will be documented only after the application is implemented and measurements have been performed.