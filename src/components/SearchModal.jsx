import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { assetPath } from '../utils/assetPath'
import { formatPrice } from '../utils/formatPrice'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const handleClose = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])

  const results = query.trim()
    ? PRODUCTS.filter(p => {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.keywords.some(k => k.toLowerCase().includes(q))
        )
      })
    : []

  // 모달 열릴 때 input 포커스
  useEffect(() => {
    let focusTimeout

    if (isOpen) {
      focusTimeout = setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      clearTimeout(focusTimeout)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC 키로 닫기
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div className="search-modal is-open" role="dialog" aria-modal="true" aria-labelledby="searchModalTitle" aria-hidden="false">
      <div className="search-modal__overlay" onClick={handleClose} />
      <div className="search-modal__container">
        <div className="search-modal__header">
          <h2 id="searchModalTitle" className="visually-hidden">제품 검색</h2>
          <div className="search-modal__input-wrapper">
            <svg className="search-modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              className="search-modal__input"
              placeholder="제품명을 입력하세요"
              autoComplete="off"
              aria-label="제품 검색"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-modal__clear"
                aria-label="검색어 지우기"
                onClick={() => setQuery('')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <button type="button" className="search-modal__close" aria-label="검색 모달 닫기" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="search-modal__content" aria-live="polite">
          {/* 입력 전 */}
          {!query && (
            <div className="search-empty" role="status">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p>제품명을 입력해주세요</p>
            </div>
          )}

          {/* 결과 없음 */}
          {query && results.length === 0 && (
            <div className="search-no-results" role="status">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <p>검색 결과가 없습니다</p>
            </div>
          )}

          {/* 검색 결과 */}
          {results.length > 0 && (
            <div className="search-results has-results">
              {results.map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="search-result-item"
                  onClick={handleClose}
                >
                  <div className="search-result-item__image">
                    <img src={assetPath(product.images[0])} alt={product.name} />
                  </div>
                  <div className="search-result-item__info">
                    <p className="search-result-item__name">{product.name}</p>
                    <p className="search-result-item__category">{product.category}</p>
                    <p className="search-result-item__price">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
