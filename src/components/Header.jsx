import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/cart-context'
import MobileMenu from './MobileMenu'
import SearchModal from './SearchModal'
import { useCompare } from '../context/compare-context'
import { compareUrl } from '../utils/productDiscovery'

export default function Header() {
  const { cartCount } = useCart()
  const { ids } = useCompare()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <header className={`header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="container">
          <div className="header__container">
            {/* Logo */}
            <Link to="/" className="header__logo">DUOBACK</Link>

            {/* Navigation */}
            <nav className="header__nav">
              <NavLink to="/products" className="header__nav-link">제품</NavLink>
              <NavLink to={compareUrl(ids)} className="header__nav-link">모델 비교</NavLink>
              <NavLink to="/brand" className="header__nav-link">선택 가이드</NavLink>
              <NavLink to="/support" className="header__nav-link">구매 전 확인</NavLink>
            </nav>

            {/* Actions */}
            <div className="header__actions">
              {/* 검색 */}
              <button
                className="header__action-btn"
                aria-label="검색"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* 장바구니 */}
              <Link to="/cart" className="header__action-btn" aria-label="장바구니">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="cart-badge" style={{ display: 'flex' }}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="header__menu-btn"
              aria-label="메뉴 열기"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
