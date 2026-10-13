import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><AuthProvider><CartProvider><ProductProvider><App /></ProductProvider></CartProvider></AuthProvider></BrowserRouter>
    <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: '2px', background: '#1d2925', color: '#fff' } }} />
  </React.StrictMode>
)
