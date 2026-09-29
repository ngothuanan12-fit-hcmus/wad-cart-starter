# Brief: Implementation of `cartTotal(items, options)`

> **Target file:** `src/cart.js`  
> **Test file:** `test/cart.test.js`  
> **Quality Gate:** `npm run gate` (`npm run lint && npm test`)

---

## 1. Goal
Implement the pure function `cartTotal(items, options)` in `src/cart.js` to calculate the final total cost of an e-commerce shopping cart including subtotal, VAT, and conditional shipping fees, and thoroughly test it using Node.js built-in test runner.

---

## 2. Interface Contract (Inputs & Outputs)

### Inputs
1. `items` (`Array<Object>`): List of cart items.
   - Each item has the structure:
     - `name` (`string`): Name of the product (e.g., `'Áo thun'`).
     - `price` (`number`): Price per unit in VND. Must be a non-negative number (`price >= 0`).
     - `qty` (`number`): Quantity purchased. Must be a positive integer (`Number.isInteger(qty) && qty > 0`).
2. `options` (`Object`): Calculation parameters.
   - `vatRate` (`number`): Value-added tax rate as a decimal (e.g., `0.08` for 8%).
   - `freeShipFrom` (`number`): Subtotal threshold for free shipping (e.g., `500000`).
   - `shipFee` (`number`): Default shipping fee when subtotal is below the threshold (e.g., `30000`).

### Output
- Returns a single **`number`** primitive (integer) rounded to the whole đồng (`Math.round(...)`).
- **NEVER** return a string (e.g., do not use `toFixed()` as the final return value).

---

## 3. Business Calculation Rules
1. **Empty Cart:** If `items.length === 0`, return `0` immediately (no VAT, no shipping fee applied).
2. **Subtotal:** Sum of `(price * qty)` across all items.
3. **VAT:** `subtotal * vatRate`.
4. **Shipping Fee:**
   - If `subtotal >= freeShipFrom`: shipping fee = `0`.
   - If `subtotal < freeShipFrom`: shipping fee = `shipFee`.
5. **Total:** `Math.round(subtotal + VAT + shipping)`.

### Reference Example
```javascript
items = [
  { name: 'Áo thun', price: 180000, qty: 2 },
  { name: 'Sổ tay', price: 45000, qty: 1 }
]
options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

// subtotal = (180000 * 2) + (45000 * 1) = 405000
// VAT = 405000 * 0.08 = 32400
// shipping = 30000 (since 405000 < 500000)
// Total = 405000 + 32400 + 30000 = 467400
```

---

## 4. Edge Cases & Error Handling

1. **Empty Cart:**
   - When `items` is empty (`items.length === 0`), return `0` immediately.
   - Do NOT apply VAT and do NOT apply default `shipFee`.
2. **Negative Price:**
   - If any `item.price < 0`, throw a `RangeError('Price cannot be negative')`.
3. **Invalid Quantity:**
   - If `item.qty` is not a positive integer (e.g., `<= 0`, non-integer decimal like `1.5`, or `NaN`), throw a `RangeError('Quantity must be a positive integer')`.
4. **Free Shipping Threshold Boundary:**
   - When `subtotal === freeShipFrom` exactly, shipping fee must be `0` (uses `>=` comparison).
5. **Zero-price items / Free gifts:**
   - `price === 0` with a valid positive integer `qty` is valid and should not throw.
6. **Rounding & Return Type:**
   - Floating-point calculations must be rounded to whole integer using `Math.round()`.
   - Return value must strictly be a `number` primitive, NEVER a `string`.

---

## 5. Explicit Technical Constraints (Quality & Harness Compliance)

1. **Constraint 1 (Zero Dependencies & ESM):**
   - Use plain JavaScript with ECMAScript Modules (`export function cartTotal(items, options)`).
   - Zero external runtime dependencies. Only standard built-in JavaScript.
2. **Constraint 2 (Code Style & Formatting):**
   - Must pass `npm run lint` (`prettier --check`).
   - Adhere strictly to project Prettier style: single quotes (`'`), no semicolons, 2 spaces indentation.
3. **Constraint 3 (Purity & Immutability):**
   - The function must be pure without side effects.
   - Do NOT mutate the incoming `items` array or its objects. Do NOT mutate `options`.
4. **Constraint 4 (Specific Error Type):**
   - For validation failures, specifically throw `RangeError`, NOT generic `Error` or `TypeError`.
5. **Constraint 5 (One-shot Gate Passing):**
   - Implementation must pass `npm run gate` (`npm run lint && npm test`) on the first run.
