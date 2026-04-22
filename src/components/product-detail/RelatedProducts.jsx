import { Link } from 'react-router-dom'
import PRODUCTS from '../../data/products-data'
import { assetPath } from '../../utils/assetPath'
import { formatPrice } from '../../utils/formatPrice'

export default function RelatedProducts({ currentId, category }) {
  const related = PRODUCTS
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="related-products">
      <div className="container">
        <h2 className="section-title">관련 제품</h2>
        <div className="product-grid">
          {related.map(product => (
            <article key={product.id} className="product-card">
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
                    <span className="product-card__price-current">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="product-card__price-original">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
