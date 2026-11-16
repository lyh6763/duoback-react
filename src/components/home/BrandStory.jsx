import { Link } from 'react-router-dom'
import { assetPath } from '../../utils/assetPath'

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-story__content">
          <div className="brand-story__image">
            <img src={assetPath('images/products/D2500G-DASW(1).jpg')}
              alt="D2500G-DASW 의자가 놓인 공간" width="1200" height="800" loading="lazy" />
          </div>
          <div className="brand-story__text">
            <h2 className="brand-story__title">사진으로 살펴보고,<br />사양으로 좁혀보세요</h2>
            <p className="brand-story__description">네 가지 각도의 참고 이미지를 볼 수 있습니다.</p>
            <Link to="/brand" className="btn btn--secondary">제품 탐색 안내</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
