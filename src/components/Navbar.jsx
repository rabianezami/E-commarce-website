// Navbar.jsx
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCartShopping,
  faHeart,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuthModal } from "../hooks/useAuthModal.jsx";
import { useLogoutModal } from "../hooks/useLogoutModal.jsx";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import CartSidebar from "./CartSidebar";
import "../styles/navbar.css";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const { cart } = useContext(CartContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const { requireAuth, AuthModal } = useAuthModal();
  const { confirmLogout, LogoutModalWrapper } = useLogoutModal();

  const links = [{ label: "Contact Us", href: "/Contact" }];
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const rightButtons = [
    { icon: darkMode ? faSun : faMoon, id: "theme-toggle-btn" },
    { icon: faCartShopping, id: "navbar-cart-btn" },
    { icon: faHeart, href: "/FavoritesPage" },
    { icon: faUser, id: "navbar-user-btn" },
  ];

  // کوچک و تمیز: پیام موقتی Toast
  const showToastMsg = (msg, ms = 2000) => {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  };

  return (
    <>
      {/* ✅ مودال‌ها */}
      <AuthModal />
      <LogoutModalWrapper />

      {/* ✅ Toast موقتی */}
      {toast && (
        <div className="navbar-toast">
          {toast}
          <style>{`
            .navbar-toast {
              position: fixed;
              top: 70px;
              right: 20px;
              background: rgba(0,0,0,0.8);
              color: #fff;
              padding: 8px 12px;
              border-radius: 6px;
              z-index: 2000;
              font-size: 0.9rem;
            }
          `}</style>
        </div>
      )}

      {/* ✅ Navbar */}
      <nav className={`glassNavbar fixed-top navbar shadow-sm py-2 ${darkMode ? "dark" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* برند و لینک‌ها */}
          <div className={`d-flex align-items-center gap-3 d-lg-flex ${mobileMenuOpen ? "d-none" : ""}`}>
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src="./images/logo-light.svg.jpg" alt="logo" width="40" height="40" />
              Online Shopping
            </Link>
            <div className="d-none d-lg-block">
              {links.map((l, i) => (
                <Link key={i} to={l.href} className="nav-link mb-0">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* دکمه‌های دسکتاپ */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {rightButtons.map((b, i) =>
              b.href ? (
                <Link key={i} to={b.href} className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={b.icon} />
                </Link>
              ) : (
                <button
                  key={i}
                  className="btn btn-outline-secondary position-relative"
                  onClick={() => {
                    if (b.id === "navbar-cart-btn") setCartOpen(true);
                    else if (b.id === "theme-toggle-btn") toggleDarkMode();
                    else if (b.id === "navbar-user-btn") {
                      if (user) confirmLogout();
                      else requireAuth(() => {});
                    }
                  }}
                >
                  <FontAwesomeIcon icon={b.icon} />
                  {b.id === "navbar-cart-btn" && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
              )
            )}
           
          </div>

          {/* دکمه‌های موبایل */}
          <div className={`d-lg-none d-flex align-items-center gap-2 ${mobileMenuOpen ? "d-none" : ""}`}>
            <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button className="btn btn-outline-secondary position-relative" onClick={() => setCartOpen(true)}>
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setMobileMenuOpen(true)}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {mobileMenuOpen && (
          <div className="mobile-menu d-lg-none shadow-sm rounded mt-2 bg-white">
            <div className="mobile-menu-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <button className="btn btn-outline-secondary" onClick={() => {
                if (user) confirmLogout();
                else requireAuth(() => {});
              }}>
                <FontAwesomeIcon icon={faUser} />
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setMobileMenuOpen(false)}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <ul className="list-unstyled mb-0 mt-2 px-3">
              {links.map((l, i) => (
                <li key={i}>
                  <Link to={l.href} className="nav-link py-2">{l.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/FavoritesPage" className="nav-link py-2">Favorites</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* سایدبار کارت */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
