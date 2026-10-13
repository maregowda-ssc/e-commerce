import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import OrderTracking from './pages/OrderTracking'
import { useAuth } from './context/AuthContext'

function Protected({ children }) { return useAuth().user ? children : <Navigate to="/login" replace /> }
export default function App() {
  return <div className="min-h-screen bg-paper text-ink"><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Products />} /><Route path="/product/:id" element={<ProductDetail />} /><Route path="/cart" element={<Cart />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/checkout" element={<Protected><Checkout /></Protected>} /><Route path="/orders" element={<Protected><OrderTracking /></Protected>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></div>
}
