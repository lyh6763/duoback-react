import { existsSync } from 'node:fs'
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
