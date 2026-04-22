import { assetPath } from '../../utils/assetPath'

export default function ProductGallery({ images, mainImage, onImageSelect }) {
  const activeImage = mainImage || images[0]

  return (
    <div className="product-gallery">
      {/* 메인 이미지 */}
      <div className="product-gallery__main">
        <img
          src={assetPath(activeImage)}
          alt="제품 메인 이미지"
          width="800"
          height="800"
        />
      </div>

      {/* 썸네일 */}
      <div className="product-gallery__thumbnails">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            className={`thumbnail${activeImage === src ? ' thumbnail--active' : ''}`}
            onClick={() => onImageSelect?.(src)}
          >
            <img src={assetPath(src)} alt={`제품 이미지 ${index + 1}`} width="100" height="100" />
          </button>
        ))}
      </div>
    </div>
  )
}
