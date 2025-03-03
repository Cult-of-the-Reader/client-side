import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";

import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'


import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
