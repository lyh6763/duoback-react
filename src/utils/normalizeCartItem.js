import PRODUCTS from '../data/products-data.js'

export function normalizeQuantity(value) {
  const quantity = Number.parseInt(value, 10)
  return Number.isFinite(quantity) ? Math.min(99, Math.max(1, quantity)) : 1
}

export function normalizeCartItem(item) {
  if (!item || typeof item !== 'object') return null
  const product = PRODUCTS.find(product => product.id === item.id)
  if (!product) return null
  const selectedColor = product.colors.some(color => color.name === item.selectedColor)
    ? item.selectedColor : product.colors[0].name
  return {
    ...item, id: product.id, name: product.name, category: product.category,
    price: product.price, selectedColor, quantity: normalizeQuantity(item.quantity),
    image: product.colorImages[selectedColor],
  }
}
