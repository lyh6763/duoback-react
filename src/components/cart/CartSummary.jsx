import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart-context'
import { formatPrice } from '../../utils/formatPrice'

export default function CartSummary() {
  const { cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  function handleCheckout() {
    clearCart()
    alert('데모 주문이 완료되었습니다.')
    navigate('/products')
  }

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">주문 요약</h2>

      <div className="cart-summary__row">
        <span>상품 금액</span>
        <span>{formatPrice(cartTotal)}</span>
      </div>

      <div className="cart-summary__row">
        <span>배송비</span>
        <span>무료</span>
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__row cart-summary__row--total">
        <span>총 결제 금액</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>

      <button
        type="button"
        className="btn btn--primary btn--large cart-summary__checkout"
        onClick={handleCheckout}
      >
        결제하기
      </button>

      <button
        type="button"
        className="btn btn--secondary btn--large"
        onClick={() => navigate('/products')}
      >
        쇼핑 계속하기
      </button>
    </div>
  )
}
