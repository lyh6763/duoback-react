import { Link } from 'react-router-dom'
import PRODUCTS from '../../data/products-data'
import ProductCard from '../products/ProductCard'
import { IMAGE_NOTICE } from '../../data/purchase-guide'

const BEST = PRODUCTS.slice(0, 4)

export default function BestProducts() {
  return (
    <section className="best-products">
      <div className="container">
        <div className="best-products__header">
          <div className="ad-head">
            <span className="eyebrow">Collection</span>
            <div className="ad-head__top">
              <span className="ad-head__index">(01)</span>
              <h2 className="ad-head__title">먼저 살펴볼 <em>네 가지</em> 모델</h2>
            </div>
            <p className="ad-head__sub">카탈로그에 등록된 순서입니다. {IMAGE_NOTICE}</p>
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
