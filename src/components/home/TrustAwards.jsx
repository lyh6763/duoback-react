import { assetPath } from '../../utils/assetPath'

const AWARDS = [
  { src: 'images/awards/kc.png', alt: 'KC인증', name: 'KC인증' },
  { src: 'images/awards/iso9001.png', alt: 'ISO9001', name: 'ISO9001' },
  { src: 'images/awards/good-design.png', alt: '굿디자인', name: '굿디자인' },
  { src: 'images/awards/reddot.png', alt: '레드닷', name: '레드닷' },
]

export default function TrustAwards() {
  return (
    <section className="trust-awards">
      <div className="container">
        <h2 className="trust-awards__title">신뢰할 수 있는 품질</h2>
        <div className="trust-awards__grid">
          {AWARDS.map(({ src, alt, name }) => (
            <div key={name} className="award-item">
              <div className="award-item__image">
                <img src={assetPath(src)} alt={alt} loading="lazy" width="200" height="200" />
              </div>
              <p className="award-item__name">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
