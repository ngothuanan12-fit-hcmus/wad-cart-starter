export function cartTotal(items, options = {}) {
  if (!items || items.length === 0) {
    return 0
  }

  for (const item of items) {
    if (
      typeof item.price !== 'number' ||
      item.price < 0 ||
      Number.isNaN(item.price)
    ) {
      throw new RangeError('Price cannot be negative')
    }

    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('Quantity must be a positive integer')
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const vatRate = options.vatRate ?? 0
  const vat = subtotal * vatRate
  const freeShipFrom = options.freeShipFrom ?? 0
  const shipFee = options.shipFee ?? 0
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee

  return Math.round(subtotal + vat + shipping)
}
