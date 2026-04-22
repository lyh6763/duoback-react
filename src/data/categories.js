import PRODUCTS from './products-data'

const CATEGORY_DEFINITIONS = [
  {
    key: 'office',
    label: '사무용',
    productCategory: '사무용 의자',
    title: '사무용 의자',
    subtitle: 'Office Chairs',
  },
  {
    key: 'student',
    label: '학생용',
    productCategory: '학생용 의자',
    title: '학생용 의자',
    subtitle: 'Student Chairs',
  },
  {
    key: 'gaming',
    label: '게이밍',
    productCategory: '게이밍 의자',
    title: '게이밍 의자',
    subtitle: 'Gaming Chairs',
  },
  {
    key: 'premium',
    label: '프리미엄',
    productCategory: '프리미엄 의자',
    title: '프리미엄 의자',
    subtitle: 'Premium Chairs',
  },
]

export const ALL_CATEGORY_CONFIG = {
  title: '전체 제품',
  subtitle: 'All Products',
}

export const ACTIVE_CATEGORIES = CATEGORY_DEFINITIONS.filter(({ productCategory }) =>
  PRODUCTS.some(product => product.category === productCategory)
)

export const ACTIVE_CATEGORY_KEYS = new Set(
  ACTIVE_CATEGORIES.map(({ key }) => key)
)

export const CATEGORY_MATCHES = Object.fromEntries(
  ACTIVE_CATEGORIES.map(({ key, productCategory }) => [key, [productCategory]])
)

export function getCategoryConfig(key) {
  return CATEGORY_DEFINITIONS.find(category => category.key === key) ?? null
}
