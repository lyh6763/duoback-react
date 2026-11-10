import { useEffect, useState } from 'react'
import PRODUCTS from '../data/products-data'
import { CompareContext } from './compare-context'
import { normalizeCompareIds, toggleCompareId } from '../utils/productDiscovery'

const STORAGE_KEY = 'duoback_compare'
export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try { return normalizeCompareIds(JSON.parse(sessionStorage.getItem(STORAGE_KEY)), PRODUCTS) }
    catch { return [] }
  })
  const [message, setMessage] = useState('')
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids)) }
    catch { /* Comparison still works when storage is unavailable. */ }
  }, [ids])

  function toggle(id) {
    const next = toggleCompareId(ids, id, PRODUCTS)
    setIds(next.ids)
    setMessage(next.limitReached ? '최대 3개까지 비교할 수 있습니다. 선택한 모델 하나를 해제한 뒤 추가하세요.' : '')
  }
  function remove(id) { setIds(current => current.filter(value => value !== id)); setMessage('') }
  function clear() { setIds([]); setMessage('') }
  function selectIds(nextIds) { setIds(normalizeCompareIds(nextIds, PRODUCTS)); setMessage('') }

  return <CompareContext.Provider value={{ ids, toggle, remove, clear, selectIds, message }}>{children}</CompareContext.Provider>
}
