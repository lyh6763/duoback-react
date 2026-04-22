import { Link } from 'react-router-dom'
import { useCart } from '../context/cart-context'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

export default function Cart() {
  const { cartItems } = useCart()
  const isEmpty = cartItems.length === 0

  return (
    <section className="cart-page">
      <div className="container">
        <span className="eyebrow cart-page__eyebrow">Order Summary</span>
        <h1 className="cart-page__title">장바구니</h1>

        {/* 빈 장바구니 */}
        {isEmpty && (
          <div className="cart-empty is-visible">
            <h2>장바구니가 비어있습니다</h2>
            <p>관심 있는 제품을 장바구니에 담아보세요</p>
            <Link to="/products" className="btn btn--primary">제품 보러가기</Link>
          </div>
        )}

        {/* 장바구니 내용 */}
        {!isEmpty && (
          <div className="cart-content is-visible">
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem key={`${item.id}-${item.selectedColor}`} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </div>
    </section>
  )
}
