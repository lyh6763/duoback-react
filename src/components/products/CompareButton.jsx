import { useCompare } from '../../context/compare-context'

export default function CompareButton({ product }) {
  const { ids, toggle } = useCompare()
  const selected = ids.includes(product.id)
  return (
    <button type="button" className={'compare-button' + (selected ? ' is-selected' : '')}
      aria-pressed={selected} aria-label={product.name + (selected ? ' 비교 해제' : ' 비교에 담기')}
      onClick={() => toggle(product.id)}>
      <span aria-hidden="true">{selected ? '✓' : '+'}</span> {selected ? '비교 선택됨' : '비교에 담기'}
    </button>
  )
}
