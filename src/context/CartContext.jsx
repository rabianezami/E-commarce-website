
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || {});
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === product.id)) return prev.filter(f => f.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, favorites, setFavorites, toggleFavorite }}>
      {children}
    </CartContext.Provider>
  );
}

