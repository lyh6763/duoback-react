export default function ProductSources({ product }) {
  return (
    <p className="product-sources">
      <span>출처: 듀오백 공식몰, {product.source.checkedAt} 확인</span>
      <a href={product.source.url} target="_blank" rel="noreferrer">상품 정보 ↗</a>
      <a href={product.source.sizeUrl} target="_blank" rel="noreferrer">치수 도면 ↗</a>
      <a href={product.source.featureUrl} target="_blank" rel="noreferrer">기능 설명 ↗</a>
    </p>
  )
}
