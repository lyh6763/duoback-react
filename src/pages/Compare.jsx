import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PRODUCTS from '../data/products-data'
import { useCompare } from '../context/compare-context'
import { normalizeCompareIds, hasComparisonDifference } from '../utils/productDiscovery'
import { formatPrice } from '../utils/formatPrice'
import { assetPath } from '../utils/assetPath'
import { PRICE_NOTICE, IMAGE_NOTICE, MISSING_SPEC, MISSING_SPEC_NOTE } from '../data/purchase-guide'

const ALL_ROWS = [
  { key: 'price', label: '기본 판매가', get: product => formatPrice(product.price) },
  { key: 'priceBasis', label: '가격 기준', get: product => product.priceBasis },
  { key: 'category', label: '용도', get: product => product.category },
  { key: 'seatHeight', label: '좌판 높이', get: product => product.specs.seatHeight },
  { key: 'armrest', label: '팔걸이', get: product => product.specs.armrest },
  { key: 'size', label: '크기 W × D × H', get: product => product.specs.size },
  { key: 'weight', label: '제품 무게', get: product => product.specs.weight },
  { key: 'material', label: '소재', get: product => product.specs.material },
  { key: 'colors', label: '공식 판매 색상', get: product => product.specs.colors },
  { key: 'maxWeight', label: '최대 하중', get: product => product.specs.maxWeight },
]
const ROWS = ALL_ROWS.filter(row => PRODUCTS.some(product => row.get(product) != null))

export default function Compare() {
  const [params, setParams] = useSearchParams()
  const { ids, remove, clear, selectIds } = useCompare()
  const [differencesOnly, setDifferencesOnly] = useState(false)
  const hasUrlModels = params.has('models')
  const modelIds = normalizeCompareIds(hasUrlModels ? params.get('models').split(',') : ids, PRODUCTS)
  const products = modelIds.map(id => PRODUCTS.find(product => product.id === id))
  const hasInvalidIds = hasUrlModels && params.get('models') !== modelIds.join(',')
  const rows = ROWS.map(row => ({ ...row, values: products.map(row.get) }))
  const shownRows = differencesOnly && products.length > 1 ? rows.filter(row => hasComparisonDifference(row.values)) : rows

  function removeModel(id) {
    remove(id)
    const next = new URLSearchParams(params)
    next.set('models', modelIds.filter(value => value !== id).join(','))
    setParams(next)
  }
  function clearModels() { clear(); setParams({ models: '' }); }
  return (
    <section className="compare-page">
      <div className="container">
        <div className="compare-heading">
          <div><h1>모델 비교</h1><p>차이와 확인된 사양을 한 화면에서 살펴보세요.</p></div>
          <Link to="/products" className="btn btn--secondary" onClick={() => selectIds(modelIds)}>목록에서 모델 추가</Link>
        </div>
        <p className="catalog-note">가격과 사양은 2026-10-14 공식몰 기준입니다({PRICE_NOTICE}). {IMAGE_NOTICE}</p>
        {hasInvalidIds && <p role="status">유효한 모델 중 최대 3개만 표시합니다.</p>}
        {products.length === 0 ? (
          <div className="products-empty"><h2>비교할 모델을 선택하세요</h2><p>제품 목록에서 비교에 담기를 눌러 최대 3개까지 선택할 수 있습니다.</p><Link to="/products" className="btn btn--primary">모델 고르기</Link></div>
        ) : (
          <>
            <div className="compare-controls">
              <label><input type="checkbox" checked={differencesOnly} disabled={products.length < 2}
                onChange={event => setDifferencesOnly(event.target.checked)} /> 차이 있는 항목만 보기</label>
              <button type="button" onClick={clearModels}>전체 해제</button>
            </div>
            {products.length < 2
              ? <p className="compare-hint">한 모델을 더 선택하면 차이를 비교할 수 있습니다.</p>
              : <p className="compare-hint compare-hint--scroll">표를 좌우로 넘겨 모든 모델을 볼 수 있습니다.</p>}
            <div className="compare-table-scroll" tabIndex="0" role="region" aria-label="모델 비교표, 좌우 스크롤 가능">
              <table className="compare-table">
                <caption className="visually-hidden">{products.map(product => product.name).join(', ')} 비교</caption>
                <thead><tr><th scope="col">확인 항목</th>{products.map(product => (
                  <th key={product.id} scope="col">
                    <img src={assetPath(product.images[0])} alt={product.name + ' 참고 이미지'} width="160" height="160" />
                    <Link to={'/products/' + product.id}>{product.name}</Link>
                    <button type="button" aria-label={product.name + ' 비교에서 제거'} onClick={() => removeModel(product.id)}>선택 해제</button>
                  </th>
                ))}</tr></thead>
                <tbody>{shownRows.map(row => (
                  <tr key={row.key} className={new Set(row.values.filter(value => value != null)).size > 1 ? 'compare-row--different' : ''}>
                    <th scope="row">{row.label}</th>{row.values.map((value,index) => <td key={products[index].id} className={value == null ? 'is-unverified' : ''}>{value ?? MISSING_SPEC}</td>)}
                  </tr>
                ))}</tbody>
                <tfoot><tr><th scope="row">자료 출처</th>{products.map(product => <td key={product.id}>
                  <a href={product.source.url} target="_blank" rel="noreferrer">공식 상품 정보 ↗</a>
                  <a href={product.source.sizeUrl} target="_blank" rel="noreferrer">치수 도면 ↗</a>
                  <a href={product.source.featureUrl} target="_blank" rel="noreferrer">기능 설명 ↗</a>
                  <span>{product.source.checkedAt} 확인</span>
                </td>)}</tr></tfoot>
              </table>
            </div>
            {shownRows.some(row => row.values.some(value => value == null)) &&<p className="specs-note">{MISSING_SPEC_NOTE}</p>}
          </>
        )}
      </div>
    </section>
  )
}
