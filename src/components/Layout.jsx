import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CompareTray from './CompareTray'
import { useCompare } from '../context/compare-context'

function focusMainContent() {
  const target = document.getElementById('main-content')
  target?.focus({ preventScroll: true })
  target?.scrollIntoView({ block: 'start', behavior: 'instant' })
}

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
      if (targetId === 'main-content') {
        focusMainContent()
        return
      }
      const target = document.getElementById(targetId)
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hash, pathname])

  return null
}

export default function Layout({ children }) {
  const { ids } = useCompare()
  const { pathname, search } = useLocation()
  return (
    <>
      <Link to={{ pathname, search, hash: '#main-content' }} className="skip-link" onClick={focusMainContent}>본문 바로가기</Link>
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
