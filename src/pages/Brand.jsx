import { Link } from 'react-router-dom'

const TECHNOLOGIES = [
  {
    title: '듀얼백 시스템',
    description: '독립적으로 움직이는\n이중 등받이',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="16" y="8" width="32" height="48" rx="4" />
        <line x1="16" y1="32" x2="48" y2="32" />
        <circle cx="24" cy="20" r="3" />
        <circle cx="40" cy="20" r="3" />
        <circle cx="24" cy="44" r="3" />
        <circle cx="40" cy="44" r="3" />
      </svg>
    ),
  },
  {
    title: '싱크로 틸팅',
    description: '체중에 따라\n자동 조절',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="20" width="40" height="32" rx="4" />
        <path d="M20 20 L20 12 Q20 8 24 8 L40 8 Q44 8 44 12 L44 20" />
        <line x1="32" y1="28" x2="32" y2="44" />
        <circle cx="32" cy="36" r="6" />
      </svg>
    ),
  },
  {
    title: '에어 서포트',
    description: '공기압으로\n맞춤 지지',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="16" y="16" width="32" height="32" rx="4" />
        <path d="M24 24 L24 40 M28 24 L28 40 M32 24 L32 40 M36 24 L36 40 M40 24 L40 40" />
        <circle cx="32" cy="10" r="3" />
        <line x1="32" y1="13" x2="32" y2="16" />
      </svg>
    ),
  },
]

const TIMELINE = [
  { year: '1993', title: '듀오백 창립', description: '국내 최초 인체공학 의자 개발' },
  { year: '2000', title: '해외 진출', description: '일본, 중국 시장 진출' },
  { year: '2010', title: '레드닷 디자인 어워드 수상', description: '국제적인 디자인 인정' },
  { year: '2015', title: '듀얼백 시스템 특허 획득', description: '독자적인 인체공학 기술 개발' },
  { year: '2020', title: '친환경 소재 도입', description: '지속 가능한 제품 생산' },
  { year: '2024', title: 'T90 프리미엄 라인 출시', description: '최고급 인체공학 의자 시리즈' },
]

const VALUES = [
  { number: '01', title: '인체공학', description: '사람의 몸을 이해하고\n최적의 자세를 연구합니다' },
  { number: '02', title: '품질', description: '엄격한 품질 관리로\n오래 사용할 수 있는 제품을 만듭니다' },
  { number: '03', title: '혁신', description: '끊임없는 연구와 개발로\n더 나은 제품을 추구합니다' },
  { number: '04', title: '지속가능성', description: '환경을 생각하는\n책임 있는 생산을 실천합니다' },
]

export default function Brand() {
  return (
    <>
      {/* 브랜드 히어로 */}
      <section className="brand-hero">
        <div className="brand-hero__content">
          <p className="eyebrow brand-hero__eyebrow">Ergonomics Lab</p>
          <h1 className="brand-hero__title">DUOBACK</h1>
          <p className="brand-hero__subtitle">Since 1993</p>
          <p className="brand-hero__description">당신의 건강한 자세를 위한<br />30년의 연구</p>
        </div>
      </section>

      {/* 철학 */}
      <section className="brand-philosophy">
        <div className="container">
          <div className="brand-philosophy__content">
            <h2 className="brand-philosophy__title">우리의 철학</h2>
            <blockquote className="brand-philosophy__quote">
              <p>"좋은 의자는 당신이 의자에 앉아있다는 것을 잊게 만듭니다."</p>
            </blockquote>
            <p className="brand-philosophy__text">
              듀오백은 인체공학적 설계를 통해<br />
              사용자가 가장 편안한 자세를 유지할 수 있도록<br />
              끊임없이 연구하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 기술 */}
      <section className="technology">
        <div className="container">
          <h2 className="section-title text-center">핵심 기술</h2>
          <div className="technology-grid">
            {TECHNOLOGIES.map(({ title, description, icon }) => (
              <div key={title} className="tech-card">
                <div className="tech-card__icon">{icon}</div>
                <h3 className="tech-card__title">{title}</h3>
                <p className="tech-card__description">
                  {description.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="history">
        <div className="container">
          <h2 className="section-title text-center">연혁</h2>
          <div className="timeline">
            {TIMELINE.map(({ year, title, description }) => (
              <div key={year} className="timeline-item">
                <div className="timeline-item__year">{year}</div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__title">{title}</h3>
                  <p className="timeline-item__description">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가치 */}
      <section className="values">
        <div className="container">
          <h2 className="section-title text-center">우리의 가치</h2>
          <div className="values-grid">
            {VALUES.map(({ number, title, description }) => (
              <div key={number} className="value-card">
                <div className="value-card__number">{number}</div>
                <h3 className="value-card__title">{title}</h3>
                <p className="value-card__description">
                  {description.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="brand-cta">
        <div className="container">
          <div className="brand-cta__content">
            <h2 className="brand-cta__title">당신에게 맞는 의자를 찾아보세요</h2>
            <Link to="/products" className="btn btn--primary btn--large">제품 보러가기</Link>
          </div>
        </div>
      </section>
    </>
  )
}
