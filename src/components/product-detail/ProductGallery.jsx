import { assetPath } from '../../utils/assetPath'

export default function ProductGallery({ images, mainImage, onImageSelect, tag, productName = '제품' }) {
  const activeImage = mainImage || images[0]

  return (
    <div className="product-gallery">
      {/* 메인 이미지 */}
      <div className="product-gallery__main">
        <span className="gallery__tick gallery__tick--tl" aria-hidden="true"></span>
        <span className="gallery__tick gallery__tick--tr" aria-hidden="true"></span>
        <span className="gallery__tick gallery__tick--bl" aria-hidden="true"></span>
        <span className="gallery__tick gallery__tick--br" aria-hidden="true"></span>
        <img
          src={assetPath(activeImage)}
          alt={`${productName} 메인 참고 이미지`}
          width="800"
          height="800"
        />
        {tag && <span className="gallery__spec">{tag}</span>}
      </div>

      {/* 썸네일 */}
      <div className="product-gallery__thumbnails" role="group" aria-label="제품 각도별 이미지 선택">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`thumbnail${activeImage === src ? ' thumbnail--active' : ''}`}
            aria-pressed={activeImage === src}
            aria-label={`${productName} 참고 이미지 ${index + 1} 보기`}
            onClick={() => onImageSelect?.(src)}
          >
            <img src={assetPath(src)} alt={`${productName} 썸네일 ${index + 1}`} width="100" height="100" />
          </button>
        ))}
      </div>
    </div>
  )
}
