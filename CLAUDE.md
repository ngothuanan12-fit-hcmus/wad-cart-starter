# Project Guidelines: cartTotal

## Stack
- **Language**: JavaScript (ES Modules, `type: "module"` in `package.json`)
- **Runtime**: Node.js (v20+)
- **Testing**: Built-in Node test runner (`node:test`, `node:assert/strict`)
- **Lint & Format**: Prettier (devDependency only)

## Commands
- `npm test`: Run the test suite (`node --test`)
- `npm run lint`: Check code formatting with Prettier
- `npm run format`: Format code in `src/` and `test/`
- `npm run gate`: Full quality gate (`npm run lint && npm test`)

## Rules & Constraints (NEVER)
- **NEVER** add or import any runtime dependencies in `src/cart.js` — plain JavaScript only.
- **NEVER** return a string or use `.toFixed()` in `cartTotal` — the result must be a `number` rounded to the whole đồng.
- **NEVER** modify files outside of `src/` when implementing business logic.
- **NEVER** commit or merge code if `npm run gate` fails (must be green).
