import { Link } from 'react-router-dom'
import { ACTIVE_CATEGORY_KEYS } from '../../data/categories'

const CATEGORIES = [
  {
    key: 'office',
    label: '사무용',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="32" width="48" height="24" rx="2" />
        <path d="M32 32V16" />
        <path d="M24 16h16" />
      </svg>
    ),
  },
  {
    key: 'student',
    label: '학생용',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="28" width="40" height="28" rx="2" />
        <path d="M32 28V16" />
        <circle cx="32" cy="12" r="4" />
      </svg>
    ),
  },
  {
    key: 'gaming',
    label: '게이밍',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="24" width="48" height="32" rx="2" />
        <path d="M20 24V12h24v12" />
      </svg>
    ),
  },
  {
    key: 'premium',
    label: '프리미엄',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 8l8 16h16l-12 12 4 16-16-8-16 8 4-16-12-12h16z" />
      </svg>
    ),
  },
]

export default function CategoryNav() {
  const visibleCategories = CATEGORIES.filter(({ key }) => ACTIVE_CATEGORY_KEYS.has(key))

  return (
    <section className="category-nav">
      <div className="container">
        <div className="category-nav__grid">
          {visibleCategories.map(({ key, label, icon }) => (
            <Link key={key} to={`/products?category=${key}`} className="category-card">
              <div className="category-card__icon">{icon}</div>
              <h3 className="category-card__title">{label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
