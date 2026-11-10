import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import PRODUCTS from '../src/data/products-data.js'
import {
  ACTIVE_CATEGORIES,
  ACTIVE_CATEGORY_KEYS,
  CATEGORY_MATCHES,
} from '../src/data/categories.js'

test('product ids are unique', () => {
  const ids = PRODUCTS.map(product => product.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('product image references exist in public assets', () => {
  for (const product of PRODUCTS) {
    const images = new Set([
      ...product.images,
      ...Object.values(product.colorImages ?? {}),
      ...Object.values(product.colorViews ?? {}).flat(),
    ])

    for (const image of images) {
      assert.equal(
        existsSync(join('public', image)),
        true,
        `${product.id} references missing image: ${image}`,
      )
    }
  }
})

test('active categories map to existing products', () => {
  assert.deepEqual([...ACTIVE_CATEGORY_KEYS], ACTIVE_CATEGORIES.map(category => category.key))

  for (const category of ACTIVE_CATEGORIES) {
    const matches = CATEGORY_MATCHES[category.key]
    assert.ok(matches?.includes(category.productCategory))
    assert.ok(PRODUCTS.some(product => product.category === category.productCategory))
  }
})

test('published prices match the recorded official base-price snapshot', () => {
  const sources = JSON.parse(readFileSync('docs/product-verification.sources.json', 'utf8'))
  for (const product of PRODUCTS) {
    const source = sources.find(source => source.url === product.source.url)
    assert.ok(source)
    assert.equal(product.price, source.basePrice)
    assert.equal(product.source.checkedAt, source.checkedAt)
    for (const field of ['size', 'seatHeight', 'weight', 'armrest', 'colors', 'material']) {
      if (product.specs[field] !== null) assert.match(product.source.fieldUrls[field], /^https:\/\//)
    }
  }
})

test('verified fixed-chair specifications replace the former adjustable-chair examples', () => {
  assert.equal(PRODUCTS.find(product => product.id === 'q1w').specs.armrest, '고정형')
  assert.equal(PRODUCTS.find(product => product.id === 'dk073w').specs.seatHeight, '412mm (고정)')
  assert.equal(PRODUCTS.find(product => product.id === 'd043w').specs.seatHeight, '460mm (고정)')
  for (const product of PRODUCTS) assert.equal(product.specs.maxWeight, null)
})
