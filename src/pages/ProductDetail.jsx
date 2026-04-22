import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import ProductGallery from '../components/product-detail/ProductGallery'
import ProductInfo from '../components/product-detail/ProductInfo'
import ProductTabs from '../components/product-detail/ProductTabs'
import RelatedProducts from '../components/product-detail/RelatedProducts'

function ProductDetailContent({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0])

  return (
    <>
      {/* 제품 정보 섹션 */}
      <section className="product-info">
        <div className="container">
          <div className="product-info__container">
            <ProductGallery
              images={product.images}
              mainImage={mainImage}
              onImageSelect={setMainImage}
            />
            <ProductInfo product={product} onColorChange={setMainImage} />
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      <ProductTabs product={product} />

      {/* 관련 제품 */}
      <RelatedProducts currentId={product.id} category={product.category} />
    </>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id)

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="empty-state__title">제품을 찾을 수 없습니다</h2>
        <p className="empty-state__description">요청하신 제품이 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/products" className="btn btn--primary">전체 제품 보기</Link>
      </div>
    )
  }

  return <ProductDetailContent key={product.id} product={product} />
}
