import { test } from 'node:test'
import assert from 'node:assert/strict'
import PRODUCTS from '../src/data/products-data.js'
import { parseBudget, discoverProducts, normalizeCompareIds, toggleCompareId, hasComparisonDifference, summarizeCatalog } from '../src/utils/productDiscovery.js'
import { normalizeCartItem } from '../src/utils/normalizeCartItem.js'

test('budget parsing distinguishes zero from an unset or invalid limit', () => {
  assert.equal(parseBudget('0'), 0)
  assert.equal(parseBudget('200000'), 200000)
  for (const value of [null, '', '-1', 'abc', '2e5', '200.5', 'Infinity', '9007199254740992']) assert.equal(parseBudget(value), null)
})

test('budget includes a model at the exact limit and combines with category', () => {
  assert.deepEqual(discoverProducts(PRODUCTS, { category: 'office', budget: 198000 }).map(product => product.id), ['q1w'])
  assert.deepEqual(discoverProducts(PRODUCTS, { budget: 200000 }).map(product => product.id), ['q1w', 'dk073w', 'd043w'])
  assert.deepEqual(discoverProducts(PRODUCTS, { budget: 0 }), [])
})

test('price sorting preserves canonical catalog order', () => {
  const originalIds = PRODUCTS.map(product => product.id)
  const sorted = discoverProducts(PRODUCTS, { sort: 'price-low' })
  assert.deepEqual(sorted.map(product => product.id), ['d043w', 'dk073w', 'q1w', 'd2500g', 'd3hs'])
  assert.deepEqual(PRODUCTS.map(product => product.id), originalIds)
})

test('invalid comparison URLs and stored values cannot create extra or duplicate slots', () => {
  assert.deepEqual(normalizeCompareIds(['q1w', 'missing', 'q1w', null, 'dk073w', 'd3hs', 'd043w'], PRODUCTS), ['q1w', 'dk073w', 'd3hs'])
  assert.deepEqual(normalizeCompareIds({ models: ['q1w'] }, PRODUCTS), [])
})

test('a fourth model is rejected without replacing the selected three', () => {
  const selected = ['q1w', 'dk073w', 'd3hs']
  assert.deepEqual(toggleCompareId(selected, 'd043w', PRODUCTS), { ids: selected, limitReached: true })
  const removed = toggleCompareId(selected, 'dk073w', PRODUCTS)
  assert.deepEqual(toggleCompareId(removed.ids, 'd043w', PRODUCTS).ids, ['q1w', 'd3hs', 'd043w'])
})

test('differences-only comparison never treats missing evidence as equality', () => {
  assert.equal(hasComparisonDifference(['고정형', '고정형']), false)
  assert.equal(hasComparisonDifference(['고정형', '조절형']), true)
  assert.equal(hasComparisonDifference([null, null]), true)
  assert.equal(hasComparisonDifference(['고정형', null]), true)
})

test('hero catalog summary is derived from recorded prices and specifications', () => {
  assert.deepEqual(summarizeCatalog(PRODUCTS), {
    price: [145000, 472000],
    seatHeight: [412, 530],
    armrests: ['없음', '고정', '조절'],
  })
  const single = summarizeCatalog([{ price: 100000, specs: { seatHeight: '450mm (고정)', armrest: '회전형' } }])
  assert.deepEqual(single, { price: [100000, 100000], seatHeight: [450, 450], armrests: ['회전'] })
})

test('stored demo cart prices are refreshed from the current verified snapshot', () => {
  const saved = { id: 'q1w', name: 'old label', selectedColor: '그레이', quantity: 2, price: 890000 }
  const item = normalizeCartItem(saved)
  assert.equal(item.price, 198000)
  assert.equal(item.name, 'Q1W 메쉬')
  assert.equal(item.quantity, 2)
  assert.equal(item.selectedColor, '그레이')
  assert.equal(saved.price, 890000)
})

test('malformed cart entries cannot bypass catalog price or quantity constraints', () => {
  assert.equal(normalizeCartItem(null), null)
  assert.equal(normalizeCartItem({ id: 'unknown' }), null)
  const item = normalizeCartItem({ id: 'q1w', price: Infinity, quantity: 1000, selectedColor: 'unknown' })
  assert.equal(item.quantity, 99)
  assert.equal(item.price, 198000)
  assert.equal(item.selectedColor, '블랙')
})
