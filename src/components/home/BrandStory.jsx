import { Link } from 'react-router-dom'
import { assetPath } from '../../utils/assetPath'

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-story__content">
          <div className="brand-story__image">
            <img
              src={assetPath('images/home-workspace.webp')}
              srcSet={`${assetPath('images/home-workspace-720.webp')} 720w, ${assetPath('images/home-workspace.webp')} 1200w`}
              sizes="(min-width: 1400px) calc(700px - 3.5rem), (min-width: 1024px) calc(50vw - 3.5rem), calc(100vw - 3rem)"
              alt="밝은 나무 책상 옆에 놓인 회색 메시 의자" width="1200" height="800" loading="lazy" decoding="async"
            />
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
