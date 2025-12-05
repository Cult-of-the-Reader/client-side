import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

import Header from './components/Home/Header.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Book = lazy(() => import('./pages/Book.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="content-wrapper">
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/book/:id" element={<Book />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
