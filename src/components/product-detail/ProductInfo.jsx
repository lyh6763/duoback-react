import { useState } from 'react'
import { useCart } from '../../context/cart-context'
import { formatPrice } from '../../utils/formatPrice'

export default function ProductInfo({ product, onColorChange }) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)

  function handleColorSelect(colorName) {
    setSelectedColor(colorName)
    const image = product.colorImages?.[colorName] || product.images[0]
    onColorChange?.(image)
  }

  function handleQuantityChange(delta) {
    setQuantity(q => Math.min(99, Math.max(1, q + delta)))
  }

  function handleInputChange(e) {
    const val = parseInt(e.target.value)
    if (!isNaN(val)) setQuantity(Math.min(99, Math.max(1, val)))
  }

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      selectedColor,
      quantity,
      image: product.colorImages?.[selectedColor] || product.images[0],
    })
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="product-details">
      <p className="eyebrow product-details__eyebrow">Precision Series</p>
      <h1 className="product-details__title">{product.name}</h1>
      <p className="product-details__category">{product.category}</p>

      {/* 가격 */}
      <div className="product-details__price">
        <span className="price-current">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <>
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
            <span className="price-discount">{discount}%</span>
          </>
        )}
      </div>

      <div className="product-details__divider" />

      {/* 컬러 선택 */}
      <div className="product-option">
        <h3 className="product-option__label">컬러</h3>
        <div className="color-selector">
          {product.colors.map(({ name, color }) => (
            <button
              key={name}
              className={`color-option${selectedColor === name ? ' color-option--active' : ''}`}
              aria-label={`${name} 선택`}
              onClick={() => handleColorSelect(name)}
            >
              <span
                className="color-swatch"
                style={{
                  backgroundColor: color,
                  border: color === '#FFFFFF' ? '1px solid #E5E2DC' : undefined,
                }}
              />
              <span className="color-name">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="product-details__divider" />

      {/* 수량 선택 */}
      <div className="product-option">
        <h3 className="product-option__label">수량</h3>
        <div className="quantity-selector">
          <button
            className="quantity-btn quantity-btn--minus"
            aria-label="수량 감소"
            disabled={quantity <= 1}
            onClick={() => handleQuantityChange(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            min="1"
            max="99"
            aria-label="수량"
            onChange={handleInputChange}
          />
          <button
            className="quantity-btn quantity-btn--plus"
            aria-label="수량 증가"
            disabled={quantity >= 99}
            onClick={() => handleQuantityChange(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="product-details__actions">
        <button className="btn btn--secondary btn--large" onClick={handleAddToCart}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          장바구니 담기
        </button>
        <button className="btn btn--primary btn--large">바로 구매하기</button>
      </div>

      {/* 특징 */}
      <div className="product-features">
        <div className="feature-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>인체공학 설계</span>
        </div>
        <div className="feature-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>3년 품질 보증</span>
        </div>
        <div className="feature-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>무료 배송</span>
        </div>
      </div>
    </div>
  )
}
