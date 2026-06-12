export default function FilterBar({
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}) {
  const tabs = [{ key: 'all', label: '전체' }, ...categories]

  return (
    <section className="filter-bar">
      <div className="container">
        <div className="filter-bar__content">
          {/* Category */}
          <div className="filter-bar__left">
            <div className="category-filter" role="group" aria-label="카테고리">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  className={`category-chip${category === key ? ' category-chip--active' : ''}`}
                  aria-pressed={category === key}
                  onClick={() => onCategoryChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + View Toggle */}
          <div className="filter-bar__right">
            <div className="select-wrapper">
              <select
                className="filter-select"
                value={sort}
                onChange={e => onSortChange(e.target.value)}
                aria-label="정렬"
              >
                <option value="">추천순</option>
                <optgroup label="가격">
                  <option value="price-low">낮은 가격순</option>
                  <option value="price-high">높은 가격순</option>
                </optgroup>
                <optgroup label="인기">
                  <option value="popular">인기 많은순</option>
                  <option value="review">리뷰 많은순</option>
                </optgroup>
                <optgroup label="신상품">
                  <option value="newest">최신순</option>
                  <option value="oldest">오래된순</option>
                </optgroup>
              </select>
            </div>

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
