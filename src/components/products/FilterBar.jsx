export default function FilterBar({ sort, onSortChange, view, onViewChange }) {
  function handlePriceChange(e) {
    onSortChange(e.target.value ? `price-${e.target.value}` : '')
  }

  function handlePopularChange(e) {
    onSortChange(e.target.value || '')
  }

  function handleNewChange(e) {
    onSortChange(e.target.value || '')
  }

  // select 값 역산
  const priceVal = sort === 'price-low' ? 'low' : sort === 'price-high' ? 'high' : ''
  const popularVal = sort === 'popular' || sort === 'review' ? sort : ''
  const newVal = sort === 'newest' || sort === 'oldest' ? sort : ''

  return (
    <section className="filter-bar">
      <div className="container">
        <div className="filter-bar__content">
          {/* Sort */}
          <div className="filter-bar__left">
            <div className="select-wrapper">
              <select className="filter-select" value={priceVal} onChange={handlePriceChange}>
                <option value="">가격순</option>
                <option value="low">낮은 가격순</option>
                <option value="high">높은 가격순</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select className="filter-select" value={popularVal} onChange={handlePopularChange}>
                <option value="">인기순</option>
                <option value="popular">인기 많은순</option>
                <option value="review">리뷰 많은순</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select className="filter-select" value={newVal} onChange={handleNewChange}>
                <option value="">신상품순</option>
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="filter-bar__right">
            <button
              className={`view-toggle${view === 'grid' ? ' view-toggle--active' : ''}`}
              aria-label="그리드 보기"
              aria-pressed={view === 'grid'}
              onClick={() => onViewChange('grid')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={`view-toggle${view === 'list' ? ' view-toggle--active' : ''}`}
              aria-label="리스트 보기"
              aria-pressed={view === 'list'}
              onClick={() => onViewChange('list')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
