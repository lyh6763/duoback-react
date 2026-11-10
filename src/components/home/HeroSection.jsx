import { Link } from 'react-router-dom'
import { assetPath } from '../../utils/assetPath'
import PRODUCTS from '../../data/products-data'
import { summarizeCatalog } from '../../utils/productDiscovery'

const SUMMARY = summarizeCatalog(PRODUCTS)
const toManwon = won => String(Math.round(won / 1000) / 10)
const range = ([min, max], format = String) => min === max ? format(min) : format(min) + '–' + format(max)

const METRICS = [
  { value: range(SUMMARY.price, toManwon), unit: '만원', label: '기본 판매가 범위' },
  { value: range(SUMMARY.seatHeight), unit: 'mm', label: '좌판 높이 범위' },
  { value: SUMMARY.armrests.join('·'), unit: '', label: '팔걸이 방식' },
]

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__left">
            <p className="hero__eyebrow eyebrow">DUOBACK Collection</p>
            <h1 className="hero__title">의자, 모델별로<br />비교해보세요</h1>
            <p className="hero__subtitle">예산으로 후보를 좁히고, 좌판 높이와 팔걸이의 차이를 확인하세요.</p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--primary">모델 고르고 비교하기</Link>
              <Link to="/brand" className="hero__guide">선택 가이드 →</Link>
            </div>
          </div>
          <div className="hero__right">
            <div className="hero__visual">
              <img src={assetPath('images/products/D2500G-DASW(1).jpg')}
                alt="D2500G-DASW 공간 연출 참고 이미지" className="hero__product-image" width="800" height="800" />
              <span className="hero__spec">D2500G-DASW</span>
            </div>
          </div>
        </div>
        <dl className="hero__metrics-bar" aria-label={PRODUCTS.length + '개 모델 요약'}>
          {METRICS.map(({ value, unit, label }) => (
            <div key={label} className="hero__metric">
              <dt className="hero__metric-label">{label}</dt>
              <dd className="hero__metric-value">{value}{unit && <span className="unit">{unit}</span>}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
