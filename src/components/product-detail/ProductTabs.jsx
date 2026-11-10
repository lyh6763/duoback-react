import { useRef, useState } from 'react'
import PRODUCTS from '../../data/products-data'
import { assetPath } from '../../utils/assetPath'
import { PURCHASE_GUIDE, MISSING_SPEC, MISSING_SPEC_NOTE } from '../../data/purchase-guide'
import ProductSources from '../ProductSources'

const TABS = [
  { id: 'detail', label: '제품 살펴보기' },
  { id: 'specs', label: '사양' },
  { id: 'shipping', label: '구매 전 확인' },
]
const SPEC_LABELS = {
  name: '제품명', category: '카테고리', size: '크기 (W × D × H)',
  seatHeight: '좌판 높이', backHeight: '등받이 높이', armrest: '팔걸이',
  material: '소재', colors: '컬러', maxWeight: '최대 하중', origin: '원산지',
  weight: '제품 무게',
}
// A row no model has data for (e.g. 최대 하중) is dropped rather than shown as a column of blanks.
const RECORDED_SPEC_KEYS = new Set(Object.keys(SPEC_LABELS).filter(key => PRODUCTS.some(product => product.specs[key] != null)))

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('detail')
  const tabRefs = useRef([])
  const tabId = id => product.id + '-tab-' + id
  const panelId = id => product.id + '-panel-' + id
  const specRows = Object.entries(product.specs).filter(([key]) => RECORDED_SPEC_KEYS.has(key))
  const { armrest, material } = product.specs

  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = TABS.length - 1
    else return
    event.preventDefault()
    setActiveTab(TABS[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  function panelProps(id) {
    return {
      id: panelId(id), role: 'tabpanel', 'aria-labelledby': tabId(id),
      hidden: activeTab !== id, tabIndex: 0,
      className: 'tab-panel' + (activeTab === id ? ' tab-panel--active' : ''),
    }
  }

  return (
    <section className="product-tabs">
      <div className="container">
        <div className="tabs-nav" role="tablist" aria-label="제품 상세 탭">
          {TABS.map((tab, index) => (
            <button key={tab.id} type="button" id={tabId(tab.id)}
              ref={element => { tabRefs.current[index] = element }}
              className={'tab-btn' + (activeTab === tab.id ? ' tab-btn--active' : '')}
              role="tab" aria-selected={activeTab === tab.id} aria-controls={panelId(tab.id)}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onKeyDown={event => handleTabKeyDown(event, index)}
              onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className="tabs-content">
          <div {...panelProps('detail')}>
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">{product.name} 살펴보기</h2>
              <div className="detail-section">
                <h3>{material ? '팔걸이와 소재' : '팔걸이'}</h3>
                <p>팔걸이: {armrest}{material && ' · 소재: ' + material}</p>
                <img src={assetPath(product.images[0])} alt={product.name + ' 앞모습'} loading="lazy" width="1200" height="600" />
                <h3>다른 각도에서 보기</h3>
                <p>측면 사진과 상단 갤러리를 함께 보며 등받이, 좌판, 다리 형태를 살펴보세요.</p>
                {product.images[1] && <img src={assetPath(product.images[1])} alt={product.name + ' 측면'} loading="lazy" width="1200" height="600" />}
              </div>
            </div>
          </div>
          <div {...panelProps('specs')}>
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">제품 사양</h2>
              <table className="specs-table">
                <caption className="visually-hidden">{product.name} 사양</caption>
                <tbody>{specRows.map(([key, value]) => (
                  <tr key={key}><th scope="row">{SPEC_LABELS[key]}</th><td>{value ?? MISSING_SPEC}{product.source.fieldUrls[key] && <a className="spec-source-link" href={product.source.fieldUrls[key]} target="_blank" rel="noreferrer" aria-label={SPEC_LABELS[key] + ' 출처 원문'}>원문 ↗</a>}</td></tr>
                ))}</tbody>
              </table>
              {specRows.some(([, value]) => value == null) && <p className="specs-note">{MISSING_SPEC_NOTE}</p>}
              <ProductSources product={product} />
            </div>
          </div>
          <div {...panelProps('shipping')}>
            <div className="tab-panel__inner">
              <h2 className="tab-panel__title">구매 전 확인할 내용</h2>
              <div className="shipping-info">{PURCHASE_GUIDE.map(item => (
                <div key={item.id}><h3>{item.title}</h3><p>{item.answer}</p></div>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
