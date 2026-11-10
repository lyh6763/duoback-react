import { Link } from 'react-router-dom'
import { PURCHASE_GUIDE } from '../../data/purchase-guide'

export default function PurchaseChecklist() {
  return (
    <section className="trust-awards">
      <div className="container">
        <div className="trust-awards__head"><h2 className="trust-awards__title">구매 전에 확인하세요</h2></div>
        <div className="purchase-guide-grid">{PURCHASE_GUIDE.map(item => (
          <Link key={item.id} to="/support#faq" className="purchase-guide-card">
            <h3>{item.title}</h3><p>{item.question}</p><span>확인할 내용 보기 →</span>
          </Link>
        ))}</div>
      </div>
    </section>
  )
}
