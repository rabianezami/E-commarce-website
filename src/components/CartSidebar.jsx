import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckoutModal from "./CheckoutModal";
import "../styles/cartSidebar.css";

export default function CartSidebar({ isOpen, onClose, products }) {
  const { cart, setCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const navigate = useNavigate(); // ← اضافه شد

  const changeQty = (id, delta) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (delta === 1) newCart[id] = (newCart[id] || 0) + 1;
      if (delta === -1) {
        if (newCart[id] > 1) newCart[id]--;
        else delete newCart[id];
      }
      return newCart;
    });
  };

  const removeItem = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const cartItems = Object.keys(cart);
  const total = cartItems.reduce((sum, id) => sum + cart[id] * 10, 0);

  const handleCheckout = () => setShowCheckout(true);

  const handleContinueShopping = () => {
    onClose();          // سایدبار بسته شود
    navigate("/products/all"); // به صفحه محصولات برود
  };

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header d-flex justify-content-between align-items-center">
          <h4>Your Cart ({cartItems.length})</h4>
          <button className="close-btn text-dark" onClick={onClose}><FontAwesomeIcon icon={faX} /></button>
        </div>

        <ul className="cart-items">
          {cartItems.map(id => (
            <li key={id} className="cart-item">
              <span>Product {id}</span>
              <div className="cart-controls">
                <button onClick={() => changeQty(id, -1)}><FontAwesomeIcon icon={faMinus} /></button>
                <span>{cart[id]}</span>
                <button onClick={() => changeQty(id, 1)}><FontAwesomeIcon icon={faPlus} /></button>
                <button onClick={() => removeItem(id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-footer mt-3 d-flex flex-column gap-2">
          <span>Total: {total}؋</span>

          {/* دکمه Checkout */}
          <button className="btn btn-card-fill w-100" onClick={handleCheckout}>
            Checkout
          </button>

          {/* دکمه Continue Shopping */}
          <button
            className="btn btn-outline w-100"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <CheckoutModal
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        products={products}
      />
    </>
  );
}
