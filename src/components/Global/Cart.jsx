import "./Cart.css";

const Cart = ({ items, total, onRemoveItem, updateQuantity, onCheckout }) => {

  return (
    <div className="cart-content">
      {items && items.length > 0 ? (
        <>
          <div className="cart-items">

            {items.map((item) => {

              const price = item.book?.price || 0;
              const discount = item.book?.discount || 0;
              const finalPrice = price * (1 - discount);

              return (
                <div key={item._id} className="cart-item">
                  <div className="book-details">
                    <h4>{item.book.title}</h4>
                  </div>
                  <div className="cover-wrapper">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="item-cover"
                    />


                  </div>

                  <div className="item-controls">
                    <div className="price-container">
                      {discount > 0 ? (
                        <>
                          <span className="discounted-price">${finalPrice.toFixed(2)}</span>
                          <span className="original-price">${price}</span>
                        </>
                      ) : (
                        <span className="discounted-price">${finalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="action-buttons">

                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => onRemoveItem(item.book._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-footer">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;