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
import { CartContext } from "../context/CartContext";
import CartSidebar from "./CartSidebar";
import "../styles/navbar.css";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const links = [{ label: "Contact Us", href: "/Contact" }];
  const rightButtons = [
    { icon: darkMode ? faSun : faMoon, id: "theme-toggle-btn" },
    { icon: faCartShopping, id: "navbar-cart-btn" },
    { icon: faHeart, href: "/FavoritesPage" },
    { icon: faUser },
  ];

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <>
      <nav className={`glassNavbar fixed-top navbar shadow-sm py-2 ${darkMode ? "dark" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* لوگو و برند */}
          <div className={`d-flex align-items-center gap-3 d-lg-flex ${mobileMenuOpen ? "d-none" : ""}`}>
            <a className="navbar-brand d-flex align-items-center gap-2" href="/">
              <img src="./images/logo-light.svg.jpg" alt="logo" width="40" height="40" />
              Online Shopping
            </a>
            <div className="d-none d-lg-block">
              {links.map((l, i) => (
                <a key={i} href={l.href} className="nav-link mb-0">{l.label}</a>
              ))}
            </div>
          </div>

          {/* دکمه‌های دسکتاپ */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {rightButtons.map((b, i) =>
              b.href ? (
                <a key={i} href={b.href} className="btn btn-outline-secondary" style={{ color: b.color || "black" }}>
                  <FontAwesomeIcon icon={b.icon} />
                </a>
              ) : (
                <button
                  key={i}
                  className="btn btn-outline-secondary position-relative"
                  onClick={
                    b.id === "navbar-cart-btn"
                      ? () => setCartOpen(true)
                      : b.id === "theme-toggle-btn"
                      ? toggleDarkMode
                      : undefined
                  }
                >
                  <FontAwesomeIcon icon={b.icon} color={b.color || "black"} />
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

        {/* منوی موبایل سفارشی */}
        {mobileMenuOpen && (
          <div className="mobile-menu d-lg-none shadow-sm rounded mt-2 bg-white">
            <div className="mobile-menu-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <button className="btn btn-outline-secondary">
                <FontAwesomeIcon icon={faUser} />
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setMobileMenuOpen(false)}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <ul className="list-unstyled mb-0 mt-2 px-3">
              {links.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="nav-link py-2">{l.label}</a>
                </li>
              ))}
              <li>
                <a href="/FavoritesPage" className="nav-link py-2"> Favorites</a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
