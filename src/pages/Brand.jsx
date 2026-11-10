import { Link } from 'react-router-dom'
import { assetPath } from '../utils/assetPath'

const CHECKS = [
  { number: '01', title: '좌판 높이', description: '모델별 조절 범위를 살펴보고, 앉았을 때 발이 바닥에 닿는지 체험해보세요.' },
  { number: '02', title: '팔걸이 방식', description: '고정형과 조절형의 차이를 확인하고 책상과 함께 사용할 때의 높이를 살펴보세요.' },
  { number: '03', title: '소재와 형태', description: '앞·옆·뒤 사진으로 등받이와 좌판 형태를 확인하고, 실제 착좌감을 함께 살펴보세요.' },
]

export default function Brand() {
  return (
    <>
      <section className="brand-hero" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("' + assetPath('images/products/D2500G-DASW(1).jpg') + '")' }}>
        <div className="brand-hero__content">
          <p className="eyebrow brand-hero__eyebrow">제품 탐색 안내</p>
          <h1 className="brand-hero__title">DUOBACK</h1>
          <p className="brand-hero__description">사진과 사양으로<br />모델의 차이를 살펴보세요</p>
        </div>
      </section>
      <section className="brand-philosophy">
        <div className="container">
          <div className="brand-philosophy__content">
            <h2 className="brand-philosophy__title">의자를 고를 때 확인할 세 가지</h2>
            <p className="brand-philosophy__text">모델명이나 가격만으로 착좌감을 판단하기는 어렵습니다. 조절 범위와 형태를 먼저 살펴보고, 구매 전에는 실제 제품에 앉아 확인해보세요.</p>
          </div>
        </div>
      </section>
      <section className="values">
        <div className="container">
          <div className="values-grid">{CHECKS.map(item => (
            <div key={item.number} className="value-card">
              <span className="value-card__number">{item.number}</span>
              <h3 className="value-card__title">{item.title}</h3>
              <p className="value-card__description">{item.description}</p>
            </div>
          ))}</div>
        </div>
      </section>
      <section className="brand-cta">
        <div className="container">
          <div className="brand-cta__content">
            <h2 className="brand-cta__title">모델별 사진과 사양을 확인하세요</h2>
            <Link to="/products" className="btn btn--primary btn--large">제품 살펴보기</Link>
          </div>
        </div>
      </section>
    </>
  )
}
