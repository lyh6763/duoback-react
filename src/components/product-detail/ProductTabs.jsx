import { useState } from 'react'
import { assetPath } from '../../utils/assetPath'

const StarIcon = ({ filled = true }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} opacity={filled ? 1 : 0.3} stroke="currentColor" strokeWidth={filled ? 0 : 1}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const TABS = [
  { id: 'detail', label: '상세정보' },
  { id: 'specs', label: '스펙' },
  { id: 'reviews', label: '리뷰' },
  { id: 'shipping', label: '배송안내' },
]

const SPEC_LABELS = {
  name: '제품명',
  category: '카테고리',
  size: '크기 (W x D x H)',
  seatHeight: '좌판 높이',
  backHeight: '등받이 높이',
  armrest: '팔걸이',
  material: '소재',
  colors: '컬러',
  maxWeight: '최대 하중',
  origin: '원산지',
  warranty: '품질보증',
  kc: 'KC 인증',
}

const REVIEWS = [
  { author: '김**', stars: 5, date: '2026.01.15', content: '재택근무하면서 하루 8시간 이상 앉아있는데 전혀 불편함이 없어요. 특히 허리 지지력이 정말 좋습니다. 가격은 있지만 그만한 가치가 있는 것 같아요.' },
  { author: '이**', stars: 4, date: '2026.01.10', content: '메쉬 소재라 여름에도 시원하게 사용할 수 있을 것 같아요. 조립도 생각보다 간단했고, 디자인도 깔끔해서 사무실에 잘 어울립니다.' },
  { author: '박**', stars: 5, date: '2026.01.05', content: '허리 디스크가 있어서 의자 선택에 신중했는데, 듀오백 의자는 정말 편하네요. 장시간 앉아도 허리 통증이 없어졌어요. 강력 추천합니다!' },
]

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('detail')

  return (
    <section className="product-tabs">
      <div className="container">
        {/* 탭 네비게이션 */}
        <div className="tabs-nav" role="tablist" aria-label="제품 상세 탭">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? ' tab-btn--active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tabs-content">

          {/* 상세정보 */}
          <div className={`tab-panel${activeTab === 'detail' ? ' tab-panel--active' : ''}`} role="tabpanel">
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">제품 상세 정보</h2>
              <div className="detail-section">
                <h3>{product.name}의 특징</h3>
                <p>{product.summary}</p>
                <img src={assetPath(product.images[0])} alt="제품 상세 이미지 1" loading="lazy" width="1200" height="600" />
                <h3>듀얼백 시스템</h3>
                <p>상부와 하부 등받이가 독립적으로 움직여 척추의 자연스러운 곡선을 따라 최적의 지지력을 제공합니다. 어떤 자세에서도 편안함을 유지할 수 있습니다.</p>
                {product.images[1] && (
                  <img src={assetPath(product.images[1])} alt="듀얼백 시스템" loading="lazy" width="1200" height="600" />
                )}
                <h3>에어 메쉬 소재</h3>
                <p>통기성이 뛰어난 프리미엄 메쉬 소재를 사용하여 장시간 사용해도 쾌적함을 유지합니다.</p>
              </div>
            </div>
          </div>

          {/* 스펙 */}
          <div className={`tab-panel${activeTab === 'specs' ? ' tab-panel--active' : ''}`} role="tabpanel">
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">제품 사양</h2>
              <table className="specs-table">
                <caption className="visually-hidden">제품 사양 표</caption>
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    SPEC_LABELS[key] && (
                      <tr key={key}>
                        <th scope="row">{SPEC_LABELS[key]}</th>
                        <td>{key === 'seatHeight' ? `${value} (가스압 조절)` : value}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 리뷰 */}
          <div className={`tab-panel${activeTab === 'reviews' ? ' tab-panel--active' : ''}`} role="tabpanel">
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">고객 리뷰</h2>
              <div className="reviews-summary">
                <div className="reviews-summary__rating">
                  <div className="rating-number">4.8</div>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= 4} />)}
                  </div>
                  <div className="rating-count">{product.reviewCount}개 리뷰</div>
                </div>
              </div>
              <div className="reviews-list">
                {REVIEWS.map((review, index) => (
                  <article key={index} className="review-item">
                    <div className="review-header">
                      <div className="review-author">
                        <strong>{review.author}</strong>
                        <div className="review-stars">
                          {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= review.stars} />)}
                        </div>
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-content">
                      <p>{review.content}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* 배송안내 */}
          <div className={`tab-panel${activeTab === 'shipping' ? ' tab-panel--active' : ''}`} role="tabpanel">
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">배송 및 반품 안내</h2>
              <div className="shipping-info">
                <h3>배송 안내</h3>
                <ul>
                  <li><strong>무료 배송</strong>: 전 제품 무료 배송</li>
                  <li><strong>배송 기간</strong>: 결제 완료 후 2~5 영업일 이내 배송</li>
                  <li><strong>배송 방법</strong>: 택배 배송 (전문 배송팀 설치 서비스 포함)</li>
                </ul>
                <h3>반품 / 교환 안내</h3>
                <ul>
                  <li>제품 수령 후 7일 이내 반품 및 교환 가능</li>
                  <li>단순 변심 반품 시 왕복 배송비 고객 부담</li>
                  <li>제품 불량 시 무료 교환 또는 환불</li>
                  <li>조립 후 사용한 제품은 반품 불가</li>
                </ul>
                <h3>A/S 안내</h3>
                <ul>
                  <li>구매일로부터 <strong>3년 품질 보증</strong></li>
                  <li>소모품(가스실린더, 바퀴 등) 1년 보증</li>
                  <li>A/S 문의: 고객센터 1588-XXXX</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
