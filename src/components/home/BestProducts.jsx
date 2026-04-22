import { Link } from 'react-router-dom'
import PRODUCTS from '../../data/products-data'
import { assetPath } from '../../utils/assetPath'
import { formatPrice } from '../../utils/formatPrice'

const BEST = [...PRODUCTS]
  .sort((a, b) => b.popularScore - a.popularScore)
  .slice(0, 4)

function ProductCard({ product }) {
  const priceFormatted = formatPrice(product.price)
  const originalFormatted = product.originalPrice
    ? formatPrice(product.originalPrice)
    : null

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image">
          <img
            src={assetPath(product.images[0])}
            alt={product.name}
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__category">{product.category}</p>
          <div className="product-card__colors">
            {product.colors.map(({ name, color }) => (
              <span
                key={name}
                className="color-dot"
                style={{
                  backgroundColor: color,
                  border: color === '#FFFFFF' ? '1px solid #E5E2DC' : undefined,
                }}
                aria-label={name}
              />
            ))}
          </div>
          <div className="product-card__price">
            <span className="product-card__price-current">{priceFormatted}</span>
            {originalFormatted && (
              <span className="product-card__price-original">{originalFormatted}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function BestProducts() {
  return (
    <section className="best-products">
      <div className="container">
        <div className="best-products__header">
          <div className="best-products__intro">
            <h2 className="best-products__title">BEST SELLERS</h2>
            <p className="best-products__subtitle">가장 사랑받는 제품들</p>
          </div>
          <Link to="/products" className="btn btn--ghost best-products__link">전체보기 →</Link>
        </div>
        <div className="best-products__grid">
          {BEST.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
