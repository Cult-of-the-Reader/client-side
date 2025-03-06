import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hook/useCart.jsx";
import Cart from "./Cart.jsx";
import "./BooksList.css";

const BooksList = ({ books }) => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();


  const handleAddToCart = (e, book) => {
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <div className="books-page">
      <button
        className="cart-toggle-btn"
        onClick={() => setShowCart(!showCart)}
      >
        Cart ({cart.length})
      </button>

      <div className="books-container">
        {books.map((book) => (
          <div
            className="book-card"
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
          >
            <div className="card-content">
              <img className="book-cover" src={book.cover} alt={book.title} />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-price">${book.price}</p>
              {book.stock - book.reservedStock > 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => handleAddToCart(e, book)}
                >
                  Claim Soul
                </button>
              ) : (
                <div className="sold-out">Out od Stock</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <Cart
          items={cart}
          total={total}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default BooksList;
