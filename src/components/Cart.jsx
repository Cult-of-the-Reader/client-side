import "./Cart.css";

const Cart = ({ items, total, onRemoveItem, onUpdateQuantity, onClose }) => {
  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <button className="close-cart-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Cart</h2>

        <div className="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.book.cover}
                alt={item.book.title}
                className="cart-item-cover"
              />
              <div className="cart-item-info">
                <h4>{item.book?.title}</h4>
                <p>
                  ${item.book.price} x {item.quantity}
                  {item.book.discount > 0 && (
                    <span className="discount">
                      {" "}
                      (-{item.book.discount * 100}%)
                    </span>
                  )}
                </p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => onRemoveItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>

        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
