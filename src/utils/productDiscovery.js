import { CATEGORY_MATCHES } from '../data/categories.js'

export const MAX_COMPARE = 3
const SORTS = new Set(['price-low', 'price-high'])

export function parseBudget(raw) {
  if (raw === null || raw === '' || !/^\d+$/.test(String(raw))) return null
  const amount = Number(raw)
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : null
}

export function discoverProducts(products, { category = 'all', budget = null, sort = '' } = {}) {
  const matches = CATEGORY_MATCHES[category]
  const filtered = products.filter(product =>
    (!matches || matches.includes(product.category)) && (budget === null || product.price <= budget)
  )
  if (SORTS.has(sort)) {
    filtered.sort((a, b) => sort === 'price-low' ? a.price - b.price : b.price - a.price)
  }
  return filtered
}

export function normalizeCompareIds(input, products) {
  if (!Array.isArray(input)) return []
  const valid = new Set(products.map(product => product.id))
  return [...new Set(input.filter(id => typeof id === 'string' && valid.has(id)))].slice(0, MAX_COMPARE)
}

export function toggleCompareId(ids, id, products) {
  const current = normalizeCompareIds(ids, products)
  if (!products.some(product => product.id === id)) return { ids: current, limitReached: false }
  if (current.includes(id)) return { ids: current.filter(value => value !== id), limitReached: false }
  if (current.length === MAX_COMPARE) return { ids: current, limitReached: true }
  return { ids: [...current, id], limitReached: false }
}

export function hasComparisonDifference(values) {
  // Missing evidence is not evidence that specifications are equal.
  return values.some(value => value === null || value === undefined) || new Set(values).size > 1
}

const ARMREST_ORDER = ['없음', '고정', '조절']

export function summarizeCatalog(products) {
  const prices = products.map(product => product.price)
  const seatHeights = products.flatMap(product => (product.specs.seatHeight?.match(/\d+/g) ?? []).map(Number))
  const armrests = new Set(products.map(product => product.specs.armrest?.split(' ')[0].replace(/형$/, '')).filter(Boolean))
  const rank = type => ARMREST_ORDER.includes(type) ? ARMREST_ORDER.indexOf(type) : ARMREST_ORDER.length
  return {
    price: [Math.min(...prices), Math.max(...prices)],
    seatHeight: [Math.min(...seatHeights), Math.max(...seatHeights)],
    armrests: [...armrests].sort((a, b) => rank(a) - rank(b)),
  }
}

export function compareUrl(ids) {
  return '/compare' + (ids.length ? '?models=' + ids.join(',') : '')
}
