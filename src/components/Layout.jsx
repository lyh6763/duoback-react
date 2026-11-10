import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CompareTray from './CompareTray'
import { useCompare } from '../context/compare-context'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    let targetId = ''
    try {
      targetId = decodeURIComponent(hash.slice(1))
    } catch {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hash, pathname])

  return null
}

export default function Layout({ children }) {
  const { ids } = useCompare()
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main-content" className="skip-link">본문 바로가기</a>
      <ScrollToHash />
      <Header />
      <main id="main-content" tabIndex={-1} className={'main' + (ids.length && pathname !== '/compare' ? ' main--compare' : '')}>
        {children}
      </main>
      <Footer />
      <CompareTray />
    </>
  )
}
