import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const targetId = decodeURIComponent(hash.slice(1))
    const timeoutId = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [hash, pathname])

  return null
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToHash />
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  )
}
