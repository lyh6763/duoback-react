import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import './styles/reset.css'
import './styles/common.css'
import './styles/main.css'
import './styles/products.css'
import './styles/product-detail.css'
import './styles/cart.css'
import './styles/brand.css'
import './styles/support.css'
import './styles/responsive.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
