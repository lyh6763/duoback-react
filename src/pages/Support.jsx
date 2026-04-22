import { useState } from 'react'
import PRODUCTS from '../data/products-data'

const FAQ_ITEMS = [
  { id: 1, category: 'product', question: '제품의 보증 기간은 얼마나 되나요?', answer: '듀오백 제품은 구매일로부터 3년간 무상 A/S를 제공합니다. 단, 고객 과실로 인한 파손은 유상 처리됩니다.' },
  { id: 2, category: 'delivery', question: '배송 기간은 얼마나 걸리나요?', answer: '주문 확인 후 2-3 영업일 내 배송됩니다. 도서산간 지역은 추가 1-2일이 소요될 수 있습니다.' },
  { id: 3, category: 'product', question: '의자 조립이 어렵지 않나요?', answer: '모든 제품에 상세한 조립 설명서가 포함되어 있으며, 대부분 30분 이내에 조립 가능합니다. 유튜브에서 조립 영상도 확인하실 수 있습니다.' },
  { id: 4, category: 'payment', question: '교환 및 환불은 어떻게 하나요?', answer: '제품 수령 후 7일 이내에 고객센터로 연락주시면 교환 또는 환불이 가능합니다. 단, 제품 사용 흔적이 있거나 포장이 훼손된 경우 교환/환불이 불가능할 수 있습니다.' },
  { id: 5, category: 'as', question: 'A/S는 어디서 받을 수 있나요?', answer: '고객센터(1588-1234)로 연락 주시거나 홈페이지에서 A/S를 신청하시면 전담 직원이 방문하여 처리해드립니다. 전국 서비스센터 방문도 가능합니다.' },
  { id: 6, category: 'delivery', question: '배송비는 얼마인가요?', answer: '전 제품 무료 배송입니다. 도서산간 지역도 추가 배송비 없이 무료로 배송해드립니다.' },
  { id: 7, category: 'product', question: '제품의 최대 하중은 얼마인가요?', answer: '제품마다 다르지만, 대부분의 듀오백 의자는 120kg까지 안전하게 사용 가능합니다. 프리미엄 라인은 최대 130kg까지 지원합니다.' },
  { id: 8, category: 'payment', question: '할부 구매가 가능한가요?', answer: '네, 모든 신용카드로 2-12개월 무이자 할부가 가능합니다. 카드사별 무이자 혜택은 결제 페이지에서 확인하실 수 있습니다.' },
]

const FAQ_CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'product', label: '제품' },
  { key: 'delivery', label: '배송' },
  { key: 'as', label: 'A/S' },
  { key: 'payment', label: '결제/환불' },
]

const STORES = [
  {
    name: '서울 강남점',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    hours: '평일 10:00 - 19:00 / 주말 11:00 - 18:00',
  },
  {
    name: '부산 서면점',
    address: '부산광역시 부산진구 서면로 456',
    phone: '051-1234-5678',
    hours: '평일 10:00 - 19:00 / 주말 11:00 - 18:00',
  },
  {
    name: '대구 동성로점',
    address: '대구광역시 중구 동성로 789',
    phone: '053-1234-5678',
    hours: '평일 10:00 - 19:00 / 주말 11:00 - 18:00',
  },
]

export default function Support() {
  const [faqCategory, setFaqCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)
  const [asForm, setAsForm] = useState({ name: '', phone: '', email: '', product: '', purchaseDate: '', issue: '' })

  const filteredFaqs = faqCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(f => f.category === faqCategory)

  function toggleFaq(id) {
    setOpenFaq(prev => prev === id ? null : id)
  }

  function handleAsSubmit(e) {
    e.preventDefault()
    alert('A/S 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.')
  }

  return (
    <>
      {/* 히어로 */}
      <section className="support-hero">
        <div className="container">
          <p className="eyebrow support-hero__eyebrow">Support Center</p>
          <h1 className="support-hero__title">고객지원</h1>
          <p className="support-hero__subtitle">궁금하신 사항이 있으신가요? 언제든지 도와드리겠습니다.</p>
        </div>
      </section>

      {/* 퀵 링크 */}
      <section className="quick-links">
        <div className="container">
          <div className="quick-links__grid">
            {[
              { href: '#faq', title: 'FAQ', desc: '자주 묻는 질문', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
              { href: '#as', title: 'A/S 신청', desc: '제품 수리 접수', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
              { href: '#stores', title: '매장 안내', desc: '전국 매장 정보', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
              { href: '#contact', title: '1:1 문의', desc: '개별 상담 신청', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            ].map(({ href, title, desc, icon }) => (
              <a key={href} href={href} className="quick-link-card">
                <div className="quick-link-card__icon">{icon}</div>
                <h3 className="quick-link-card__title">{title}</h3>
                <p className="quick-link-card__description">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section className="contact-info" id="contact">
        <div className="container">
          <div className="contact-info__grid">
            {[
              { title: '고객센터', detail: '1588-1234', time: '평일 09:00 - 18:00', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
              { title: '이메일', detail: 'support@duoback.com', time: '24시간 접수 가능', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { title: '카카오톡', detail: '@듀오백', time: '평일 09:00 - 18:00', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
            ].map(({ title, detail, time, icon }) => (
              <div key={title} className="contact-info__card">
                <div className="contact-info__icon">{icon}</div>
                <h3 className="contact-info__title">{title}</h3>
                <p className="contact-info__detail">{detail}</p>
                <p className="contact-info__time">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">자주 묻는 질문</h2>
          <div className="faq-categories">
            {FAQ_CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                className={`faq-category-btn${faqCategory === key ? ' faq-category-btn--active' : ''}`}
                onClick={() => { setFaqCategory(key); setOpenFaq(null) }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="faq-list">
            {filteredFaqs.map(({ id, question, answer }) => (
              <div key={id} className={`faq-item${openFaq === id ? ' is-open' : ''}`}>
                <button
                  className="faq-item__question"
                  aria-expanded={openFaq === id}
                  onClick={() => toggleFaq(id)}
                >
                  <span>{question}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="faq-item__answer" aria-hidden={openFaq !== id}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A/S 신청 */}
      <section className="as-section" id="as">
        <div className="container">
          <h2 className="section-title">A/S 신청</h2>
          <p className="section-subtitle">제품에 문제가 있으신가요? A/S를 신청해주세요.</p>
          <form className="support-form" onSubmit={handleAsSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="asName" className="form-label">이름 <span className="required">*</span></label>
                <input type="text" id="asName" className="form-input" autoComplete="name" required
                  value={asForm.name} onChange={e => setAsForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="asPhone" className="form-label">연락처 <span className="required">*</span></label>
                <input type="tel" id="asPhone" className="form-input" placeholder="010-1234-5678" autoComplete="tel" required
                  value={asForm.phone} onChange={e => setAsForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asEmail" className="form-label">이메일 <span className="required">*</span></label>
              <input type="email" id="asEmail" className="form-input" placeholder="example@email.com" autoComplete="email" required
                value={asForm.email} onChange={e => setAsForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="asProduct" className="form-label">제품명 <span className="required">*</span></label>
                <select id="asProduct" className="form-select" required
                  value={asForm.product} onChange={e => setAsForm(f => ({ ...f, product: e.target.value }))}>
                  <option value="">제품 선택</option>
                  {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="asPurchaseDate" className="form-label">구매일 <span className="required">*</span></label>
                <input type="date" id="asPurchaseDate" className="form-input" required
                  value={asForm.purchaseDate} onChange={e => setAsForm(f => ({ ...f, purchaseDate: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asIssue" className="form-label">증상 <span className="required">*</span></label>
              <textarea id="asIssue" className="form-textarea" rows="5" placeholder="증상을 상세히 적어주세요" required
                value={asForm.issue} onChange={e => setAsForm(f => ({ ...f, issue: e.target.value }))} />
            </div>
            <button type="submit" className="btn btn--primary btn--large">A/S 신청하기</button>
          </form>
        </div>
      </section>

      {/* 매장 안내 */}
      <section className="stores-section" id="stores">
        <div className="container">
          <h2 className="section-title">매장 안내</h2>
          <p className="section-subtitle">전국 듀오백 매장에서 제품을 직접 체험해보세요.</p>
          <div className="stores-grid">
            {STORES.map(({ name, address, phone, hours }) => (
              <div key={name} className="store-card">
                <h3 className="store-card__name">{name}</h3>
                <div className="store-card__info">
                  <div className="store-card__row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{address}</span>
                  </div>
                  <div className="store-card__row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{phone}</span>
                  </div>
                  <div className="store-card__row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
