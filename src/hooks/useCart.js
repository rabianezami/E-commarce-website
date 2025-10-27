import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCart() {
  const { cart, setCart } = useContext(CartContext);

  // اضافه کردن محصول
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // کم کردن / حذف محصول
  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  // خالی کردن سبد
  const clearCart = () => setCart({});

  // جمع کل
  const getTotalCount = () =>
    Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCount,
  };
}
