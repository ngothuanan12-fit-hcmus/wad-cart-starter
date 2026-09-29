# SELF_ASSESSMENT_REPORT.md

## What is scored

| # | Criterion | Points | Claimed | Evidence |
|---|---|---|---|---|
| 1 | `cartTotal` behaves as specified | 30 | 28 | `npm test` passes all 11 tests (exit code 0). Worked example returns `467400` as a `number` (not string — verified via `assert.equal(typeof total, 'number')` in test line 14). Free-shipping threshold uses `>=` (test: "free shipping when subtotal is exactly at the threshold"). Empty cart returns `0` (test: "empty cart returns 0"). Negative price and invalid qty both throw `RangeError` (4 separate tests). Uses `Math.round()` instead of `toFixed()`. |
| 2 | Tests | 20 | 18 | `npm test` → 11 pass, 0 fail. Coverage includes: worked example (line 5), empty cart (line 17), free-shipping threshold exact + above + below (lines 22, 29, 36), 4 RangeError cases — negative price (line 43), qty=0 (line 53), qty negative (line 63), qty float (line 73), rounding (line 83), immutability (line 91). Each test asserts one thing and fails for exactly one reason. See `test/cart.test.js`. |
| 3 | The harness | 20 | 18 | **Rules file:** `CLAUDE.md` — project-specific: lists stack (Node 22, ESM, plain JS), commands (`npm test`, `npm run gate`), and ≥1 "never" rule (never add runtime dependencies). **Gate:** `npm run gate` = `npm run lint && npm test` (see `package.json` line 9). **CI:** `.github/workflows/ci.yml` triggers `on: push` to `main`/`master`, runs `npm ci` then `npm run gate`. |
| 4 | The brief | 15 | 14 | `BRIEF.md` in repo root. Names target file (`src/cart.js`), states full contract (inputs: `items` array + `options` object, output: `number` via `Math.round`), lists 6 edge cases (empty cart, negative price, 3 invalid qty scenarios, threshold boundary), and 5 explicit constraints (no dependencies, ESM, Prettier style, `RangeError` only, pure function). A stranger reading only `BRIEF.md` + `CLAUDE.md` can produce passing code. |
| 5 | `AI-LOG.md` | 15 | 14 | `AI-LOG.md` in repo root. 3 entries (Steps 1–3), each with all 6 template fields: Tool, Asked for, Kept, Changed, Rejected, By hand. Specific enough to cross-reference with `git diff src/cart.js` and `git diff test/cart.test.js`. Documents rejected items (`toFixed`, external test runners) and hand-done work (terminal verification, exit code checks, diff review). |
| | **Total** | **100** | **92** | |

## What I did not manage

- CI has not been verified on a live GitHub repository push (only the configuration file `.github/workflows/ci.yml` was created and inspected locally). A green local run with a red CI would score lower per the rubric notes.
- Did not add a test for `NaN` as qty (covered implicitly by `Number.isInteger(NaN) === false`, but no dedicated test case).
