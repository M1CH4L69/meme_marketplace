import './App.css'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import useCart from './hooks/useCart.js'
import Login from './routes/Login.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Memes from './routes/Memes.jsx'
import MemeDetail from './routes/MemeDetail.jsx'
import Cart from './routes/Cart.jsx'
import NotFound from './routes/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.count, 0)
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/memes">Memy</Link>
        <Link to="/cart" className="cart-link">Košík{count ? ` (${count})` : ''}</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}> 
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/memes" element={<Memes />} />
          <Route path="/memes/:id" element={<MemeDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
