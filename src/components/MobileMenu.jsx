import { useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ACTIVE_CATEGORY_KEYS } from '../data/categories'
import { useCompare } from '../context/compare-context'
import { compareUrl } from '../utils/productDiscovery'

const CATEGORY_LINKS = [
  { key: 'office', label: '사무용' },
  { key: 'student', label: '학생용' },
  { key: 'gaming', label: '게이밍' },
  { key: 'premium', label: '프리미엄' },
]

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function MobileMenu({ isOpen, onClose }) {
  const { ids } = useCompare()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const visibleCategories = CATEGORY_LINKS.filter(({ key }) =>
    ACTIVE_CATEGORY_KEYS.has(key)
  )

  // 메뉴 열릴 때 스크롤 잠금 및 포커스 이동/복귀
  useEffect(() => {
    let focusTimeout
    if (isOpen) {
      lastFocusedRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      focusTimeout = setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
        lastFocusedRef.current.focus()
        lastFocusedRef.current = null
      }
    }
    return () => {
      clearTimeout(focusTimeout)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = Array.from(containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (!containerRef.current.contains(document.activeElement)) {
          e.preventDefault()
          ;(e.shiftKey ? last : first).focus()
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  function handleCartClick() {
    onClose()
    navigate('/cart')
  }


  if (!isOpen) return null

  return (
    <div className="mobile-menu is-open" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__container" ref={containerRef}>
        {/* Header */}
        <div className="mobile-menu__header">
          <Link to="/" className="mobile-menu__logo" onClick={onClose}>DUOBACK</Link>
          <button ref={closeBtnRef} type="button" className="mobile-menu__close" aria-label="메뉴 닫기" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mobile-menu__nav">
          <NavLink to="/products" className="mobile-menu__link" onClick={onClose}>제품</NavLink>
          <NavLink to={compareUrl(ids)} className="mobile-menu__link" onClick={onClose}>모델 비교</NavLink>
          <NavLink to="/brand" className="mobile-menu__link" onClick={onClose}>선택 가이드</NavLink>
          <NavLink to="/support" className="mobile-menu__link" onClick={onClose}>구매 전 확인</NavLink>
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
        </div>
      </div>
    </div>
  )
}
