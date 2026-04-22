import { Link } from 'react-router-dom'

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-story__content">
          <div className="brand-story__image">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop"
              alt="듀오백 브랜드 이미지"
              width="1200"
              height="800"
              loading="lazy"
            />
          </div>
          <div className="brand-story__text">
            <h2 className="brand-story__title">30년의 인체공학 연구</h2>
            <p className="brand-story__description">
              듀오백은 1993년부터 인체공학 의자를 연구해 왔습니다.
              우리의 기술력은 당신의 건강한 자세를 지켜드립니다.
            </p>
            <Link to="/brand" className="btn btn--secondary">브랜드 스토리 보기</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
