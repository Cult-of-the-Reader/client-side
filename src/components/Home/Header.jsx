import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useCartContext } from "../../contexts/CartContext.jsx";
import Cart from "../Global/Cart.jsx";

import "./Header.css"
import logo from "../../assets/logo.webp"

const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart, updateQuantity, removeFromCart } = useCartContext();
  const { user, logout } = useAuth();
  const token = user?.token;

  const toggleMenu = () => {
    setShowAuth(!showAuth);
  };

  const closeMenu = () => {
    setShowAuth(false);
  };

  return (
    <header>
      <h1>
        <Link to="/" className="logo">
          <img src={logo} alt="Cult of the Reader Logo" />
          <span>Cult Of The Reader</span>
        </Link>
      </h1>
      <nav>
        <div className="nav-links">
          {/* <Link to="/about" className="nav-link">Contact</Link> */}
          <Link to="/about" className="nav-link">About Us</Link>

          {token && (
            <div className="cart-container">
              <button
                className="nav-link cart-button"
                onClick={() => { setShowCart(!showCart); console.log(cart) }}
              >
                Cart ({cart.length})
              </button>

              {showCart && (
                <div className="cart-dropdown">
                  <Cart
                    items={cart}
                    total={cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0)}
                    onRemoveItem={removeFromCart}
                    updateQuantity={updateQuantity}
                    onCheckout={() => {
                      if (!token) window.location.href = '/login';
                      else window.location.href = '/checkout';
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="auth-container">
            <button
              className="auth-button"
              onClick={toggleMenu}
            >
              {token ? "Account" : "Access"}
            </button>
            {showAuth && (
              <div className="auth-menu">
                {!token ? (
                  <>
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                    <Link to="/register" onClick={closeMenu}>Register</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={closeMenu}>Profile</Link>
                    <Link to="/" onClick={() => { logout(); closeMenu(); }}>Logout</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header >
  );
}

export default Header