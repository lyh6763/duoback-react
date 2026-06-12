import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { ACTIVE_CATEGORIES, ACTIVE_CATEGORY_KEYS, CATEGORY_MATCHES } from '../data/categories'
import ProductsHeader from '../components/products/ProductsHeader'
import FilterBar from '../components/products/FilterBar'
import ProductCard from '../components/products/ProductCard'

function sortProducts(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'price-low':  return sorted.sort((a, b) => a.price - b.price)
    case 'price-high': return sorted.sort((a, b) => b.price - a.price)
    case 'popular':    return sorted.sort((a, b) => b.popularScore - a.popularScore)
    case 'review':     return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'newest':     return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    case 'oldest':     return sorted.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
    default:           return sorted
  }
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('')
  const [view, setView] = useState('grid')

  const categoryParam = searchParams.get('category')
  const category = categoryParam && ACTIVE_CATEGORY_KEYS.has(categoryParam)
    ? categoryParam
    : 'all'

  function handleCategoryChange(key) {
    const next = new URLSearchParams(searchParams)
    if (key === 'all') {
      next.delete('category')
    } else {
      next.set('category', key)
    }
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    const matches = CATEGORY_MATCHES[category]
    if (!matches) return PRODUCTS
    return PRODUCTS.filter(p => matches.includes(p.category))
  }, [category])

  const displayed = useMemo(() => sortProducts(filtered, sort), [filtered, sort])

  const isList = view === 'list'

  return (
    <>
      <ProductsHeader category={category} count={displayed.length} />
      <FilterBar
        category={category}
        categories={ACTIVE_CATEGORIES}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
      />

      <section className="products-section">
        <div className="container">
          {displayed.length === 0 ? (
            <div className="products-empty">
              <p className="products-empty__title">해당 카테고리 제품이 준비 중입니다.</p>
              <p className="products-empty__desc">다른 카테고리를 확인해 주세요.</p>
            </div>
          ) : (
            <div className={`product-grid${isList ? ' product-grid--list' : ''}`}>
              {displayed.map(product => (
                <ProductCard key={product.id} product={product} isList={isList} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
