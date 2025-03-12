import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

import Header from './components/Home/Header.jsx'

import Home from './pages/Home.jsx'
import Book from './pages/Book.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'

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
