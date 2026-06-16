import { Link } from 'react-router-dom'
import { assetPath } from '../../utils/assetPath'

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">

          <div className="hero__left">
            <p className="hero__eyebrow eyebrow">Precision Ergonomics · Since 1993</p>
            <h1 className="hero__title">
              당신의 자세를 설계하는<br />
              <em className="editorial">인체공학</em> 체어
            </h1>
            <p className="hero__subtitle">
              인체 데이터를 기반으로 한 듀오백의 설계 철학은
              "오래 앉아도 흐트러지지 않는 몸의 균형"을 목표로 합니다.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--primary">제품 보러가기</Link>
              <Link to="/brand" className="btn btn--ghost">브랜드 스토리 →</Link>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero__visual">
              <span className="hero__tick hero__tick--tl"></span>
              <span className="hero__tick hero__tick--tr"></span>
              <span className="hero__tick hero__tick--bl"></span>
              <span className="hero__tick hero__tick--br"></span>
              <img
                src={assetPath('images/products/D2500G-DASW(1).jpg')}
                alt="D2500G-DASW 인체공학 의자"
                className="hero__product-image"
              />
              <span className="hero__spec">D2500G · 4D Ergonomic</span>
            </div>
          </div>

        </div>

        <div className="hero__metrics-bar">
          <div className="hero__metric" data-index="01">
            <span className="hero__metric-value">30<span className="unit">+</span></span>
            <span className="hero__metric-label">연구 연수</span>
          </div>
          <div className="hero__metric-divider"></div>
          <div className="hero__metric" data-index="02">
            <span className="hero__metric-value">4<span className="unit">D</span></span>
            <span className="hero__metric-label">조절 시스템</span>
          </div>
          <div className="hero__metric-divider"></div>
          <div className="hero__metric" data-index="03">
            <span className="hero__metric-value">130<span className="unit">kg</span></span>
            <span className="hero__metric-label">최대 하중</span>
          </div>
        </div>
      </div>
    </section>
  )
}
