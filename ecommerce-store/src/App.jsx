import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AllProducts from './pages/AllProducts'
import Footwear from './pages/Footwear'
import Watches from './pages/Watches'
import About from './pages/About'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Support from './pages/Support'
import HelpCenter from './pages/HelpCenter'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/footwear" element={<Footwear />} />
                <Route path="/watches" element={<Watches />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/support" element={<Support />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
