export default function FilterBar({
  category, categories, onCategoryChange, budget, onBudgetChange,
  sort, onSortChange, view, onViewChange,
}) {
  const tabs = [{ key: 'all', label: '전체' }, ...categories]
  return (
    <section className="filter-bar">
      <div className="container">
        <div className="filter-bar__content">
          <div className="filter-bar__left">
            <div className="category-filter" role="group" aria-label="카테고리">{tabs.map(({ key, label }) => (
              <button key={key} type="button"
                className={'category-chip' + (category === key ? ' category-chip--active' : '')}
                aria-pressed={category === key} onClick={() => onCategoryChange(key)}>{label}</button>
            ))}</div>
          </div>
          <div className="filter-bar__right">
            <div className="select-wrapper">
              <select className="filter-select" value={sort} onChange={event => onSortChange(event.target.value)} aria-label="정렬">
                <option value="">등록순</option><option value="price-low">낮은 가격순</option><option value="price-high">높은 가격순</option>
              </select>
            </div>
            <button type="button" className={'view-toggle' + (view === 'grid' ? ' view-toggle--active' : '')}
              aria-label="그리드 보기" aria-pressed={view === 'grid'} onClick={() => onViewChange('grid')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            </button>
            <button type="button" className={'view-toggle' + (view === 'list' ? ' view-toggle--active' : '')}
              aria-label="리스트 보기" aria-pressed={view === 'list'} onClick={() => onViewChange('list')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1" /></svg>
            </button>
          </div>
        </div>
        <div className="budget-filter">
          <label htmlFor="budgetLimit">예산 상한 (원)</label>
          <input id="budgetLimit" type="number" inputMode="numeric" min="0" step="1"
            placeholder="금액 제한 없음" value={budget ?? ''}
            onChange={event => onBudgetChange(event.target.value, { replace: true })} />
          <div className="budget-presets" role="group" aria-label="빠른 예산 선택">
            {[150000,200000,350000,500000].map(amount => <button key={amount} type="button"
              aria-pressed={budget === amount} onClick={() => onBudgetChange(String(amount))}>{amount / 10000}만원 이하</button>)}
            <button type="button" aria-pressed={budget === null} onClick={() => onBudgetChange('')}>제한 없음</button>
          </div>
        </div>
      </div>
    </section>
  )
}
