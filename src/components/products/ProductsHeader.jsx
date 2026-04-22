import { ALL_CATEGORY_CONFIG, getCategoryConfig } from '../../data/categories'

export default function ProductsHeader({ category, count }) {
  const config = category === 'all'
    ? ALL_CATEGORY_CONFIG
    : getCategoryConfig(category) || ALL_CATEGORY_CONFIG

  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header__content">
          <div>
            <span className="eyebrow page-header__eyebrow">Precision Catalog</span>
            <h1 className="page-header__title">{config.title}</h1>
            <p className="page-header__subtitle">{config.subtitle}</p>
          </div>
          <p className="page-header__count">
            총 <strong>{count}</strong>개 제품
          </p>
        </div>
      </div>
    </section>
  )
}
