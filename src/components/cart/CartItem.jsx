import { useCart } from '../../context/cart-context'
import PRODUCTS from '../../data/products-data'
import { formatPrice } from '../../utils/formatPrice'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const product = PRODUCTS.find(p => p.id === item.id)
  const colorObj = product?.colors.find(c => c.name === item.selectedColor)

  const unitPrice = item.price
  const totalPrice = unitPrice * item.quantity

  return (
    <div className="cart-item">
      {/* 이미지 */}
      <div className="cart-item__image">
        <img src={`/${item.image}`} alt={item.name} width="120" height="120" />
      </div>

      {/* 정보 */}
      <div className="cart-item__info">
        <div className="cart-item__header">
          <p className="cart-item__name">{item.name}</p>
          <p className="cart-item__category">{item.category}</p>
        </div>
        <div className="cart-item__color">
          {colorObj && (
            <span
              className="cart-item__color-dot"
              style={{
                backgroundColor: colorObj.color,
                border: colorObj.color === '#FFFFFF' ? '1px solid #E5E2DC' : undefined,
              }}
            />
          )}
          <span>{item.selectedColor}</span>
        </div>
        <div className="cart-item__controls">
          {/* 수량 조절 */}
          <div className="cart-item__quantity">
            <button
              className="cart-item__quantity-btn"
              aria-label="수량 감소"
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="cart-item__quantity-value">{item.quantity}</span>
            <button
              className="cart-item__quantity-btn"
              aria-label="수량 증가"
              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* 삭제 */}
          <button
            className="cart-item__remove"
            onClick={() => removeFromCart(item.id, item.selectedColor)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            삭제
          </button>
        </div>
      </div>

      {/* 가격 */}
      <div className="cart-item__price-section">
        <p className="cart-item__price">{formatPrice(totalPrice)}</p>
        {item.quantity > 1 && (
          <p className="cart-item__unit-price">개당 {formatPrice(item.price)}</p>
        )}
      </div>
    </div>
  )
}
