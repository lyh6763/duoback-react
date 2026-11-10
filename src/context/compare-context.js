import { createContext, useContext } from 'react'

export const CompareContext = createContext(null)
export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error('useCompare must be used within CompareProvider')
  return context
}
