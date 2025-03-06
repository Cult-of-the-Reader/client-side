import { useState, useEffect } from "react";
import api from "../services/api.js";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await api.getCartItems();

        if (!response.ok) throw new Error("Error loading cart");

        const data = await response.json();
        setCart(data.cartItems || []);
      } catch (err) {
        setError(err.message);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (book) => {
    try {
      const currentCartItems = cart.find((item) => item.book?._id === book._id);

      if (!currentCartItems) {
        const response = await api.postCartItem(book._id);

        if (!response.ok) throw new Error("Error adding to cart");

        const data = await response.json();
        setCart((prev) => [
          ...prev,
          {
            _id: data._id,
            book: {
              _id: book._id,
              title: book.title,
              cover: book.cover,
              price: book.price,
            },
            quantity: 1,
          },
        ]);
      } else {
        await updateQuantity(
          currentCartItems._id,
          currentCartItems.quantity + 1
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await api.postMoreItemsCartItem(cartItemId, newQuantity);

      if (!response.ok) throw new Error("Error updating quantity");

      setCart((prev) =>
        prev.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await api.putCartItem(cartItemId);

      if (!response.ok) throw new Error("Error removing from cart");

      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } catch (err) {
      setError(err.message);
    }
  };

  const total = (cart || []).reduce((sum, item) => {
    const price = item.book?.price || 0;
    const discount = item.book?.discount || 0;
    const quantity = item.quantity || 0;
    const priceWithDiscount = price * (1 - discount);
    return sum + priceWithDiscount * quantity;
  }, 0);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    total,
  };
};

export default useCart;
