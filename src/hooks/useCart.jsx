import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const useCart = () => {
  const { user } = useAuth();
  const token = user?.token
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const { cartItems } = await api.getCartItems(token);
      setCart(cartItems || []);
    } catch (err) {
      console.error(err.message || "Error al cargar el carrito");
    };
  }

  const addToCart = async (book) => {
    try {
      await api.postCartItem(book._id, token);
      await fetchCart();
    } catch (err) {
      console.error(err.message || "Error al agregar al carrito");
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    try {
      const currentItem = cart.find((item) => item.book._id === bookId);

      if (!currentItem) {
        throw new Error("Item no encontrado en el carrito");
      }

      if (newQuantity <= 0) {
        await removeFromCart(bookId);
        return;
      }

      const difference = newQuantity - currentItem.quantity;

      // Increment
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          await api.postCartItem(bookId, token);
        }
      // Decrement
      } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          await api.decrementCartItem(bookId, user.token);
        }
      }

      await fetchCart();
    } catch (err) {
      console.error(err.message || "Error al actualizar cantidad");
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      if (token) {
        await api.deleteCartItem(bookId, token);
        await fetchCart();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Total
  const total = cart.reduce((sum, item) => {
    const price = item.book?.price || 0;
    const discount = item.book?.discount || 0;
    const quantity = item.quantity || 0;
    const priceWithDiscount = price * (1 - discount);
    return sum + priceWithDiscount * quantity;
  }, 0);

  useEffect(() => {
    fetchCart();
  }, [token]);

  return {
    cart,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCart
  };
};
export default useCart;