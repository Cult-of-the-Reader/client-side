import { useState, useEffect } from "react";
import api from "../services/api.js";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.getCartItems();

      if (!response) throw new Error("Error loading cart");

      setCart(response.cartItems || []);
    } catch (err) {
      setError(err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (book) => {
    try {
      await api.postCartItem(book._id);
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(bookId);
        return;
      }

      const currentItem = cart.find(item => item.book._id === bookId);

      if (currentItem) {
        if (newQuantity > currentItem.quantity) {
          // Incrementar
          await api.postCartItem(bookId);
        } else if (newQuantity < currentItem.quantity) {
          // Decrementar
          await api.decrementCartItem(bookId);
        }
      }

      // Recargar siempre después de la operación
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      console.log("Removing book ID:", bookId);
      await api.deleteCartItem(bookId);
      await fetchCart(); // Recargar después de eliminar
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err.message);
    }
  };

  const total = cart.reduce((sum, item) => {
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
    refresh: fetchCart
  };
};

export default useCart;