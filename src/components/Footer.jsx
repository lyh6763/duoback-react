import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo */}
        <Link to="/" className="footer__logo">DUOBACK</Link>

        {/* Content */}
        <div className="footer__content">
          {/* 제품 */}
          <div className="footer__column">
            <h4 className="footer__column-title">제품</h4>
            <ul className="footer__links">
              <li><Link to="/products?category=office" className="footer__link">사무용</Link></li>
              <li><Link to="/products?category=student" className="footer__link">학생용</Link></li>
              <li><Link to="/products?category=gaming" className="footer__link">게이밍</Link></li>
              <li><Link to="/products?category=premium" className="footer__link">프리미엄</Link></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div className="footer__column">
            <h4 className="footer__column-title">고객지원</h4>
            <ul className="footer__links">
              <li><Link to="/support#faq" className="footer__link">FAQ</Link></li>
              <li><Link to="/support#as" className="footer__link">A/S 신청</Link></li>
              <li><Link to="/support#stores" className="footer__link">매장 안내</Link></li>
              <li><Link to="/support#contact" className="footer__link">1:1 문의</Link></li>
            </ul>
          </div>

          {/* 회사정보 */}
          <div className="footer__column">
            <h4 className="footer__column-title">회사정보</h4>
            <ul className="footer__links">
              <li><Link to="/brand" className="footer__link">회사소개</Link></li>
              <li><a href="#location" className="footer__link">오시는 길</a></li>
              <li><a href="#recruit" className="footer__link">채용 안내</a></li>
            </ul>
          </div>

          {/* SNS */}
          <div className="footer__column">
            <h4 className="footer__column-title">SNS</h4>
            <div className="footer__sns">
              <a href="#instagram" className="footer__sns-link" aria-label="인스타그램">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a href="#facebook" className="footer__sns-link" aria-label="페이스북">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#youtube" className="footer__sns-link" aria-label="유튜브">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="none" stroke="#2D2A26" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 DUOBACK. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#privacy" className="footer__legal-link">개인정보처리방침</a>
            <a href="#terms" className="footer__legal-link">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
