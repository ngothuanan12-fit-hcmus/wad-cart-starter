# AI-LOG.md

## 2026-09-29 — Step 1: Development Harness Setup (rules file, gate, CI)

Tool: Antigravity IDE (Gemini / Claude).

Asked for: Configure development harness with CLAUDE.md, a single quality gate script, Prettier linter/formatter, and GitHub Actions CI workflow on push.

Kept: The package.json scripts (`gate: npm run lint && npm test`, `lint`, `format`), `.prettierrc` configuration, and `.github/workflows/ci.yml` workflow.

Changed: Tailored `CLAUDE.md` to be strictly project-specific for `cart-starter` (Node 22 built-in test runner, plain JS ESM, explicit "never" rules prohibiting external runtime dependencies).

Rejected: Proposing external test runners (Jest, Vitest, Mocha) because the assignment stack explicitly requires Node 22 built-in runner.

By hand: Executed terminal verification commands (`npm run lint`, initial red `npm test`), checked exit codes (`$LASTEXITCODE`), verified `.github/workflows/ci.yml` trigger conditions.

## 2026-09-29 — Step 2: Specification Brief (BRIEF.md)

Tool: Antigravity IDE (Gemini / Claude).

Asked for: Draft a comprehensive BRIEF.md covering goal, contract (inputs/outputs), edge cases, and explicit constraints to ensure an LLM can implement cartTotal correctly on the first attempt.

Kept: The 5-part structure: Goal, Interface Contract, Business Calculation Rules, Edge Cases & Error Handling, and 5 Explicit Technical Constraints.

Changed: Moved "Empty Cart" explicitly into the first position under Section 4 (Edge Cases & Error Handling) rather than leaving it solely in calculation rules, ensuring immediate visibility for evaluation against rubric criteria.

Rejected: Loose error types (generic Error, TypeError) and `toFixed()` formatting to guarantee return type remains a primitive number and errors are strictly `RangeError`.

By hand: Cross-referenced every requirement against README.md lines 11–22 and rubric PDF criteria; inspected BRIEF.md to ensure all edge cases are addressed.

## 2026-09-29 — Step 3: Implement cartTotal and Test Suite

Tool: Antigravity IDE (Gemini / Claude).

Asked for: Implement cartTotal in src/cart.js and create a comprehensive test suite in test/cart.test.js matching the brief and rubric.

Kept: The pure cartTotal function using Array.prototype.reduce, strict price and positive integer qty validation throwing RangeError, conditional shipping fee, and Math.round. Expanded test suite with 11 focused unit tests in test/cart.test.js.

Changed: Added immutability test using Object.freeze and separate assertions for zero qty, negative qty, and float qty so each test fails for exactly one reason.

Rejected: Using `toFixed(0)` which returns a string, preventing the common bug noted in the rubric.

By hand: Ran `npm run gate` in PowerShell, observed quality gate turn green (exit code 0, 11 passed tests, Prettier verified), and reviewed every line of `git diff src/cart.js` and `git diff test/cart.test.js`.
