import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart-context'
import { formatPrice } from '../../utils/formatPrice'
import { PRICE_NOTICE } from '../../data/purchase-guide'
import CompareButton from '../products/CompareButton'

export default function ProductInfo({ product, selectedColor, onColorChange }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  useEffect(() => {
    if (!addedFeedback) return
    const timer = setTimeout(() => setAddedFeedback(false), 2000)
    return () => clearTimeout(timer)
  }, [addedFeedback])

  const numericQty = typeof quantity === 'number' ? quantity : (parseInt(quantity, 10) || 1)

  function handleQuantityChange(delta) {
    setQuantity(Math.min(99, Math.max(1, numericQty + delta)))
  }

  function handleInputChange(e) {
    const raw = e.target.value
    if (raw === '') {
      setQuantity('')
      return
    }
    const val = parseInt(raw, 10)
    if (!isNaN(val)) setQuantity(Math.min(99, Math.max(1, val)))
  }

  function handleInputBlur() {
    setQuantity(numericQty)
  }

  function getCartPayload() {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      selectedColor,
      quantity: numericQty,
      image: product.colorImages?.[selectedColor] || product.images[0],
    }
  }

  function handleAddToCart() {
    addToCart(getCartPayload())
    setAddedFeedback(true)
  }

  function handleBuyNow() {
    addToCart(getCartPayload())
    navigate('/cart')
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const keySpecs = [
    { label: '좌판 높이', value: product.specs?.seatHeight },
    { label: '제품 무게', value: product.specs?.weight },
    { label: '팔걸이', value: product.specs?.armrest },
  ].filter(spec => spec.value)

  return (
    <div className="product-details">
      <p className="eyebrow product-details__eyebrow">제품 정보</p>
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
        <span className="price-basis">{product.priceBasis}, {PRICE_NOTICE}</span>
      </div>

      <CompareButton product={product} />

      {/* 핵심 사양 readout */}
      {keySpecs.length > 0 && (
        <div className="spec-readout">
          {keySpecs.map(spec => (
            <div key={spec.label} className="spec-readout__item">
              <span className="spec-readout__label">{spec.label}</span>
              <span className="spec-readout__value">{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="product-details__divider" />

      {/* 컬러 선택 */}
      <div className="product-option">
        <h3 className="product-option__label">참고 이미지 색상</h3>
        <p className="gallery-notice">공식 판매 색상: {product.specs.colors}</p>
        <div className="color-selector">
          {product.colors.map(({ name, color }) => (
            <button
              key={name}
              className={`color-option${selectedColor === name ? ' color-option--active' : ''}`}
              aria-label={`${name} 선택`}
              onClick={() => onColorChange(name)}
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
            type="button"
            className="quantity-btn quantity-btn--minus"
            aria-label="수량 감소"
            disabled={numericQty <= 1}
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
            onBlur={handleInputBlur}
          />
          <button
            type="button"
            className="quantity-btn quantity-btn--plus"
            aria-label="수량 증가"
            disabled={numericQty >= 99}
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
        <button type="button" className="btn btn--secondary btn--large" onClick={handleAddToCart}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {addedFeedback ? '장바구니에 담았습니다 ✓' : '장바구니 담기'}
        </button>
        <button type="button" className="btn btn--primary btn--large" onClick={handleBuyNow}>
          주문 내용 보기
        </button>
      </div>
      <p role="status" aria-live="polite" className="visually-hidden">
        {addedFeedback ? `${product.name} ${selectedColor} ${numericQty}개를 장바구니에 담았습니다.` : ''}
      </p>

    </div>
  )
}
