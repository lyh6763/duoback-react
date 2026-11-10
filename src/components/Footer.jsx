import { Link } from 'react-router-dom'
import { ACTIVE_CATEGORIES } from '../data/categories'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">DUOBACK</Link>
        <div className="footer__content">
          <div className="footer__column">
            <h4 className="footer__column-title">제품</h4>
            <ul className="footer__links">{ACTIVE_CATEGORIES.map(({ key, label }) => (
              <li key={key}><Link to={'/products?category=' + key} className="footer__link">{label}</Link></li>
            ))}</ul>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">구매 전 확인</h4>
            <ul className="footer__links">
              <li><Link to="/support#faq" className="footer__link">자주 묻는 질문</Link></li>
              <li><Link to="/support#as" className="footer__link">A/S 입력 체험</Link></li>
              <li><Link to="/support#stores" className="footer__link">매장 방문 전 확인</Link></li>
            </ul>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">프로젝트</h4>
            <ul className="footer__links">
              <li><Link to="/brand" className="footer__link">제품 탐색 안내</Link></li>
              <li><Link to="/support#project" className="footer__link">데모와 데이터 안내</Link></li>
              <li><Link to="/support#storage" className="footer__link">입력·저장 정보 안내</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">듀오백을 소재로 제작한 독립 포트폴리오 · 공식 판매·고객지원 사이트가 아닙니다.</p>
        </div>
      </div>
    </footer>
  )
}
