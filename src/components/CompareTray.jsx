import { Link, useLocation } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { useCompare } from '../context/compare-context'
import { compareUrl } from '../utils/productDiscovery'

export default function CompareTray() {
  const { ids, remove, clear, message } = useCompare()
  const { pathname } = useLocation()
  if (!ids.length || pathname === '/compare') return null
  return (
    <aside className="compare-tray" aria-label="선택한 비교 모델">
      <div className="container">
        <div className="compare-tray__heading"><strong>모델 비교 {ids.length}/3</strong><button type="button" onClick={clear}>전체 해제</button></div>
        <div className="compare-tray__content">
          <ul>{ids.map(id => <li key={id}>{PRODUCTS.find(product => product.id === id)?.name}
            <button type="button" aria-label={id + ' 비교 목록에서 제거'} onClick={() => remove(id)}>×</button>
          </li>)}</ul>
          <Link to={compareUrl(ids)} className="btn btn--primary">{ids.length < 2 ? '비교 모델 확인' : ids.length + '개 모델 비교하기'}</Link>
        </div>
        {message && <p role="status" className="compare-feedback">{message}</p>}
      </div>
    </aside>
  )
}
