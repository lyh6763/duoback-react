import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart-context'
import { formatPrice } from '../../utils/formatPrice'
import { PRICE_NOTICE } from '../../data/purchase-guide'

export default function CartSummary() {
  const { cartItems, cartTotal, storageUnavailable } = useCart()
  const navigate = useNavigate()
  const [preview, setPreview] = useState(null)
  const currentPreview = preview?.items === cartItems ? preview : null

  function handleCheckout() {
    setPreview({ items: cartItems, total: cartTotal })
  }

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">주문 요약</h2>

      {storageUnavailable && (
        <p role="status" className="content-note">
          브라우저 저장소를 사용할 수 없어 현재 방문 동안만 장바구니가 유지됩니다.
        </p>
      )}

      <div className="cart-summary__row">
        <span>상품 금액</span>
        <span>{formatPrice(cartTotal)}</span>
      </div>

      <div className="cart-summary__row">
        <span>배송비</span>
        <span>판매처에서 확인</span>
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__row cart-summary__row--total">
        <span>상품 합계</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>

      <p className="content-note">주문 내용까지만 확인하는 체험 화면으로, 결제와 배송은 진행되지 않습니다. 금액은 공식몰 기본 판매가 합계입니다({PRICE_NOTICE}).</p>

      <button
        type="button"
        className="btn btn--primary btn--large cart-summary__checkout"
        onClick={handleCheckout}
      >
        주문 내용 확인하기
      </button>

      {currentPreview && (
        <section className="order-preview" aria-labelledby="orderPreviewTitle">
          <h3 id="orderPreviewTitle">선택한 주문 내용</h3>
          <p role="status">주문 내용을 확인했습니다. 상품은 장바구니에 그대로 남아 있습니다.</p>
          <ul>{currentPreview.items.map(item => (
            <li key={`${item.id}-${item.selectedColor}`}>
              {item.name} · {item.selectedColor} · {item.quantity}개
            </li>
          ))}</ul>
          <p>상품 합계 {formatPrice(currentPreview.total)}</p>
        </section>
      )}

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
