import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  const total = cartTotal(items, options)

  assert.equal(total, 467400)
  assert.equal(typeof total, 'number')
})

test('empty cart returns 0', () => {
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal([], options), 0)
})

test('free shipping when subtotal is exactly at the threshold', () => {
  const items = [{ name: 'Áo khoác', price: 500000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  // subtotal = 500000, VAT = 50000, shipping = 0 (exact threshold)
  assert.equal(cartTotal(items, options), 550000)
})

test('free shipping when subtotal exceeds the threshold', () => {
  const items = [{ name: 'Tai nghe', price: 600000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  // subtotal = 600000, VAT = 60000, shipping = 0
  assert.equal(cartTotal(items, options), 660000)
})

test('shipping fee applied when subtotal is below the threshold', () => {
  const items = [{ name: 'Chuột máy tính', price: 200000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  // subtotal = 200000, VAT = 20000, shipping = 30000
  assert.equal(cartTotal(items, options), 250000)
})

test('throws RangeError on negative price', () => {
  const items = [{ name: 'Lỗi giá âm', price: -50000, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  assert.throws(() => cartTotal(items, options), {
    name: 'RangeError',
    message: 'Price cannot be negative',
  })
})

test('throws RangeError when quantity is zero', () => {
  const items = [{ name: 'Lỗi số lượng 0', price: 50000, qty: 0 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  assert.throws(() => cartTotal(items, options), {
    name: 'RangeError',
    message: 'Quantity must be a positive integer',
  })
})

test('throws RangeError when quantity is negative', () => {
  const items = [{ name: 'Lỗi số lượng âm', price: 50000, qty: -2 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  assert.throws(() => cartTotal(items, options), {
    name: 'RangeError',
    message: 'Quantity must be a positive integer',
  })
})

test('throws RangeError when quantity is not an integer', () => {
  const items = [{ name: 'Lỗi số lượng thập phân', price: 50000, qty: 1.5 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  assert.throws(() => cartTotal(items, options), {
    name: 'RangeError',
    message: 'Quantity must be a positive integer',
  })
})

test('rounds to the whole đồng with fractional calculation', () => {
  const items = [{ name: 'Món lẻ', price: 12345, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  // subtotal = 12345, VAT = 12345 * 0.08 = 987.6
  // total = 12345 + 987.6 + 30000 = 43332.6 -> Math.round -> 43333
  assert.equal(cartTotal(items, options), 43333)
})

test('does not mutate input items or options', () => {
  const items = Object.freeze([
    Object.freeze({ name: 'Vật phẩm', price: 100000, qty: 1 }),
  ])
  const options = Object.freeze({
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  })

  assert.doesNotThrow(() => cartTotal(items, options))
})

test('throws RangeError when quantity is NaN', () => {
  const items = [{ name: 'Lỗi số lượng NaN', price: 50000, qty: NaN }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  assert.throws(() => cartTotal(items, options), {
    name: 'RangeError',
    message: 'Quantity must be a positive integer',
  })
})
