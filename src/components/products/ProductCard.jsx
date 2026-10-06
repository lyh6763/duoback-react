import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cart-context'
import { assetPath } from '../../utils/assetPath'
import { formatPrice } from '../../utils/formatPrice'

export default function ProductCard({ product, isList = false }) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')

  const currentImage = product.colorImages?.[selectedColor] || product.images[0]

  function handleColorSelect(e, colorName) {
    e.stopPropagation()
    setSelectedColor(colorName)
  }

  function handleAddToCart(e) {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      selectedColor,
      quantity: 1,
      image: currentImage,
    })
  }

  const priceFormatted = formatPrice(product.price)
  const originalFormatted = product.originalPrice
    ? formatPrice(product.originalPrice)
    : null

  return (
    <article className="product-card">
      <div className="product-card__link">
        {/* Image */}
        <Link to={`/products/${product.id}`} className="product-card__image-link">
          <div className="product-card__image">
            <img
              src={assetPath(currentImage)}
              alt={`${product.name} ${selectedColor}`}
              loading="lazy"
              width="600"
              height="600"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="product-card__info">
          <Link to={`/products/${product.id}`} className="product-card__text-link">
            <h3 className="product-card__name">{product.name}</h3>
            <p className="product-card__category">{product.category}</p>
          </Link>

          {/* 색상 도트 */}
          <div className="product-card__colors">
            {product.colors.map(({ name, color }) => (
              <button
                key={name}
                type="button"
                className={`color-dot color-dot--selectable${selectedColor === name ? ' is-active' : ''}`}
                style={{
                  backgroundColor: color,
                  border: color === '#FFFFFF' ? '1px solid #E5E2DC' : undefined,
                }}
                aria-label={`${name} 색상 보기`}
                aria-pressed={selectedColor === name}
                data-color={name}
                onClick={(e) => handleColorSelect(e, name)}
              />
            ))}
          </div>

          {/* 리스트 전용: 요약 */}
          {isList && (
            <p className="product-card__summary">{product.summary}</p>
          )}

          {/* 리스트 전용: 하이라이트 뱃지 */}
          {isList && (
            <div className="product-card__highlights">
              {product.highlights?.map(text => (
                <span key={text} className="product-badge">{text}</span>
              ))}
            </div>
          )}

          {/* 리스트 전용: 컬러 칩 */}
          {isList && (
            <div className="product-card__color-chips">
              {product.colors.map(({ name, color }) => (
                <button
                  key={name}
                  type="button"
                  className={`color-chip${selectedColor === name ? ' is-active' : ''}`}
                  aria-label={`${name} 색상 보기`}
                  aria-pressed={selectedColor === name}
                  onClick={(e) => handleColorSelect(e, name)}
                >
                  <span
                    className="color-chip__swatch"
                    style={{
                      backgroundColor: color,
                      border: color === '#FFFFFF' ? '1px solid #E5E2DC' : undefined,
                    }}
                  />
                  <span className="color-chip__label">{name}</span>
                </button>
              ))}
            </div>
          )}

          {/* 가격 */}
          <div className="product-card__price">
            <span className="product-card__price-current">{priceFormatted}</span>
            {originalFormatted && (
              <span className="product-card__price-original">{originalFormatted}</span>
            )}
          </div>
        </div>
      </div>

      {/* 리스트 전용: 액션 버튼 */}
      {isList && (
        <div className="product-card__actions">
          <Link to={`/products/${product.id}`} className="btn btn--secondary btn--small">
            자세히 보기
          </Link>
          <button
            type="button"
            className="btn btn--primary btn--small"
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>
        </div>
      )}
    </article>
  )
}
