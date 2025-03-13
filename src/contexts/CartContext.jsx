import React, { createContext } from "react";
import useCart from "../hooks/useCart.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>)
};

export const useCartContext = () => React.useContext(CartContext);