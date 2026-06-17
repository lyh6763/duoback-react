import { Link } from 'react-router-dom'
import PRODUCTS from '../../data/products-data'
import ProductCard from '../products/ProductCard'

const BEST = [...PRODUCTS]
  .sort((a, b) => b.popularScore - a.popularScore)
  .slice(0, 4)

export default function BestProducts() {
  return (
    <section className="best-products">
      <div className="container">
        <div className="best-products__header">
          <div className="ad-head">
            <span className="eyebrow">Best Sellers</span>
            <div className="ad-head__top">
              <span className="ad-head__index">(01)</span>
              <h2 className="ad-head__title">가장 많이 <em>선택된</em> 체어</h2>
            </div>
            <p className="ad-head__sub">지금 가장 많이 찾는 상위 4개 모델</p>
          </div>
          <Link to="/products" className="btn btn--ghost best-products__link">전체보기 →</Link>
        </div>
        <hr className="ad-rule" />
        <div className="best-products__grid">
          {BEST.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
