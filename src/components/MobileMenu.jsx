import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ACTIVE_CATEGORY_KEYS } from '../data/categories'

const CATEGORY_LINKS = [
  { key: 'office', label: '사무용' },
  { key: 'student', label: '학생용' },
  { key: 'gaming', label: '게이밍' },
  { key: 'premium', label: '프리미엄' },
]

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const visibleCategories = CATEGORY_LINKS.filter(({ key }) =>
    ACTIVE_CATEGORY_KEYS.has(key)
  )

  // 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleCartClick() {
    onClose()
    navigate('/cart')
  }

  return (
    <div className={`mobile-menu${isOpen ? ' is-open' : ''}`} role="navigation" aria-label="모바일 메뉴">
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__container">
        {/* Header */}
        <div className="mobile-menu__header">
          <Link to="/" className="mobile-menu__logo" onClick={onClose}>DUOBACK</Link>
          <button className="mobile-menu__close" aria-label="메뉴 닫기" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mobile-menu__nav">
          <NavLink to="/products" className="mobile-menu__link" onClick={onClose}>제품</NavLink>
          <NavLink to="/brand" className="mobile-menu__link" onClick={onClose}>브랜드</NavLink>
          <NavLink to="/support" className="mobile-menu__link" onClick={onClose}>고객지원</NavLink>
        </nav>

        {/* Categories */}
        <div className="mobile-menu__categories">
          <h3 className="mobile-menu__title">제품 카테고리</h3>
          {visibleCategories.map(({ key, label }) => (
            <Link
              key={key}
              to={`/products?category=${key}`}
              className="mobile-menu__category"
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="mobile-menu__actions">
          <button className="mobile-menu__action" onClick={handleCartClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            장바구니
          </button>
          <button className="mobile-menu__action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
