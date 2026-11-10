import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { ACTIVE_CATEGORIES, ACTIVE_CATEGORY_KEYS } from '../data/categories'
import { discoverProducts, parseBudget } from '../utils/productDiscovery'
import { PRICE_NOTICE, IMAGE_NOTICE } from '../data/purchase-guide'
import ProductsHeader from '../components/products/ProductsHeader'
import FilterBar from '../components/products/FilterBar'
import ProductCard from '../components/products/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const category = ACTIVE_CATEGORY_KEYS.has(categoryParam) ? categoryParam : 'all'
  const budget = parseBudget(searchParams.get('budget'))
  const sort = ['price-low', 'price-high'].includes(searchParams.get('sort')) ? searchParams.get('sort') : ''
  const view = searchParams.get('view') === 'list' ? 'list' : 'grid'
  const displayed = useMemo(() => discoverProducts(PRODUCTS, { category, budget, sort }), [category, budget, sort])

  function updateParam(key, value, replace = false) {
    const next = new URLSearchParams(searchParams)
    if (value === '' || value === 'all' || (key === 'view' && value === 'grid')) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace })
  }
  function resetFilters() {
    setSearchParams(view === 'list' ? { view: 'list' } : {})
  }
  return (
    <>
      <ProductsHeader category={category} count={displayed.length} />
      <FilterBar category={category} categories={ACTIVE_CATEGORIES}
        onCategoryChange={value => updateParam('category', value)}
        budget={budget} onBudgetChange={(value, options) => updateParam('budget', value, options?.replace ?? false)}
        sort={sort} onSortChange={value => updateParam('sort', value)}
        view={view} onViewChange={value => updateParam('view', value)} />
      <section className="products-section">
        <div className="container">
          <p className="catalog-note">가격은 2026-10-14 공식몰 기본 판매가입니다({PRICE_NOTICE}). {IMAGE_NOTICE}</p>
          <p role="status" className="catalog-result">조건에 맞는 모델 {displayed.length}개{budget !== null ? ' · 예산 상한 ' + budget.toLocaleString('ko-KR') + '원' : ''}</p>
          {displayed.length === 0 ? (
            <div className="products-empty">
              <h2 className="products-empty__title">조건에 맞는 모델이 없습니다.</h2>
              <p className="products-empty__desc">예산을 높이거나 다른 용도를 선택해보세요.</p>
              <button type="button" className="btn btn--secondary" onClick={resetFilters}>필터 초기화</button>
            </div>
          ) : (
            <div className={'product-grid' + (view === 'list' ? ' product-grid--list' : '')}>
              {displayed.map(product => <ProductCard key={product.id} product={product} isList={view === 'list'} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
