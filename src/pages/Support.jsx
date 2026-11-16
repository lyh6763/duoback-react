import { useState } from 'react'
import { Link } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { PURCHASE_GUIDE } from '../data/purchase-guide'

const FAQ_ITEMS = [
  { id: 'product-data', category: 'product', question: '상품 정보는 어디서 가져왔나요?', answer: '가격과 사양은 2026-10-14 듀오백 공식몰의 상품 정보와 치수 도면에서 옮겼고, 사양표 항목마다 원문 링크를 달았습니다. 공식 자료에서 찾지 못한 항목은 —로 표시합니다. 제품 사진은 포트폴리오용 참고 이미지입니다.' },
  ...PURCHASE_GUIDE,
  { id: 'cart-storage', category: 'product', question: '장바구니는 다시 방문해도 유지되나요?', answer: '장바구니는 현재 브라우저에 저장됩니다. 다른 기기나 브라우저와는 공유되지 않습니다. 상품을 삭제하거나 브라우저의 사이트 데이터를 지우면 저장 내역을 없앨 수 있습니다.' },
]
const FAQ_CATEGORIES = [
  { key: 'all', label: '전체' }, { key: 'product', label: '제품' },
  { key: 'delivery', label: '배송' }, { key: 'as', label: 'A/S' }, { key: 'payment', label: '결제/환불' },
]
const VISIT_CHECKS = [
  { title: '전시 모델', description: '방문하려는 매장에 원하는 모델과 색상이 전시되어 있는지 확인하세요.' },
  { title: '영업시간과 예약', description: '방문일의 운영시간과 착좌 체험에 예약이 필요한지 확인하세요.' },
  { title: '책상과 함께 사용하기', description: '좌판 높이와 팔걸이를 조절해보고, 평소 사용하는 책상 높이와도 비교해보세요.' },
]

export default function Support() {
  const [faqCategory, setFaqCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)
  const [asForm, setAsForm] = useState({ product: '', purchaseDate: '', issue: '' })
  const [preview, setPreview] = useState(null)
  const filteredFaqs = faqCategory === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter(item => item.category === faqCategory)

  function updateField(field, value) {
    setAsForm(form => ({ ...form, [field]: value }))
    setPreview(null)
  }

  function handleAsSubmit(event) {
    event.preventDefault()
    setPreview({ ...asForm })
  }

  return (
    <>
      <section className="support-hero">
        <div className="container">
          <h1 className="support-hero__title">구매 전 확인</h1>
          <p className="support-hero__subtitle">판매처에 확인할 배송·반품·A/S 항목과 매장 방문 체크리스트를 모았습니다.</p>
        </div>
      </section>
      <section className="quick-links">
        <div className="container">
          <div className="quick-links__grid">{[
            { href: '#faq', title: '자주 묻는 질문', desc: '배송·보증·상품 정보' },
            { href: '#as', title: 'A/S 입력 체험', desc: '증상 입력 화면' },
            { href: '#stores', title: '매장 방문 전 확인', desc: '전시 모델·운영시간' },
            { href: '#project', title: '프로젝트 안내', desc: '데모 범위와 저장 정보' },
          ].map(({ href, title, desc }, index) => (
            <Link key={href} to={'/support' + href} className="quick-link-card" data-index={'0' + (index + 1)}>
              <h2 className="quick-link-card__title">{title}</h2>
              <p className="quick-link-card__description">{desc}</p>
            </Link>
          ))}</div>
        </div>
      </section>
      <section className="faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">자주 묻는 질문</h2>
          <div className="faq-categories">{FAQ_CATEGORIES.map(({ key, label }) => (
            <button key={key} type="button"
              className={'faq-category-btn' + (faqCategory === key ? ' faq-category-btn--active' : '')}
              aria-pressed={faqCategory === key}
              onClick={() => { setFaqCategory(key); setOpenFaq(null) }}>{label}</button>
          ))}</div>
          <div className="faq-list">{filteredFaqs.map(({ id, question, answer }) => (
            <div key={id} className={'faq-item' + (openFaq === id ? ' is-open' : '')}>
              <button type="button" className="faq-item__question" aria-expanded={openFaq === id}
                aria-controls={'faq-' + id} onClick={() => setOpenFaq(current => current === id ? null : id)}>
                <span>{question}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div id={'faq-' + id} className="faq-item__answer" hidden={openFaq !== id}><p>{answer}</p></div>
            </div>
          ))}</div>
        </div>
      </section>
      <section className="as-section" id="as">
        <div className="container">
          <h2 className="section-title">A/S 입력 체험</h2>
          <form className="support-form" onSubmit={handleAsSubmit} aria-describedby="asDemoNotice">
            <p id="asDemoNotice" className="content-note">입력 화면만 체험할 수 있습니다. 입력한 내용은 전송하거나 저장하지 않습니다.</p>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="asProduct" className="form-label">제품명 <span className="required">*</span></label>
                <select id="asProduct" className="form-select" required value={asForm.product}
                  onChange={event => updateField('product', event.target.value)}>
                  <option value="">제품 선택</option>
                  {PRODUCTS.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="asPurchaseDate" className="form-label">구매일 <span className="required">*</span></label>
                <input type="date" id="asPurchaseDate" className="form-input" required value={asForm.purchaseDate}
                  onChange={event => updateField('purchaseDate', event.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asIssue" className="form-label">증상 <span className="required">*</span></label>
              <textarea id="asIssue" className="form-textarea" rows="5" placeholder="예: 높이를 조절할 때 소리가 납니다." required
                value={asForm.issue} onChange={event => updateField('issue', event.target.value)} />
            </div>
            <button type="submit" className="btn btn--primary btn--large">입력 내용 확인하기</button>
            {preview && (
              <section className="form-preview" aria-labelledby="asPreviewTitle">
                <h3 id="asPreviewTitle">입력한 내용</h3>
                <p role="status">체험 화면이라 A/S 신청은 접수되지 않았습니다.</p>
                <dl className="preview-details">
                  <div><dt>제품</dt><dd>{PRODUCTS.find(product => product.id === preview.product)?.name}</dd></div>
                  <div><dt>구매일</dt><dd>{preview.purchaseDate}</dd></div>
                  <div><dt>증상</dt><dd>{preview.issue}</dd></div>
                </dl>
              </section>
            )}
          </form>
        </div>
      </section>
      <section className="stores-section" id="stores">
        <div className="container">
          <h2 className="section-title">매장 방문 전 확인</h2>
          <div className="stores-grid">{VISIT_CHECKS.map(item => (
            <div key={item.title} className="store-card"><h3 className="store-card__name">{item.title}</h3><p>{item.description}</p></div>
          ))}</div>
        </div>
      </section>
      <section className="project-info" id="contact">
        <div className="container">
          <div id="project">
            <h2 className="section-title">프로젝트와 데이터 안내</h2>
            <p>듀오백을 소재로 제작한 독립 포트폴리오입니다. 공식 판매 사이트나 고객센터가 아닙니다.</p>
            <p>제품 사진을 보고 카테고리와 예산으로 목록을 좁혀 모델을 비교할 수 있습니다. 참고 이미지의 색상을 고르고 장바구니와 주문 내용도 확인할 수 있습니다. 실제 결제, 주문 전송, A/S 접수는 진행되지 않습니다.</p>
          </div>
          <div id="storage">
            <h3>입력·저장 정보</h3>
            <p>장바구니에 담은 상품과 참고 이미지의 색상, 수량은 현재 브라우저에 저장됩니다. 비교 목록은 현재 탭의 세션에 저장됩니다. A/S 체험 화면에 입력한 내용은 서버로 전송하거나 브라우저 저장소에 보관하지 않습니다. 이 화면을 떠나면 사라집니다.</p>
            <p>장바구니의 삭제 버튼이나 브라우저의 사이트 데이터 삭제 기능으로 저장된 장바구니를 지울 수 있습니다.</p>
          </div>
        </div>
      </section>
    </>
  )
}
