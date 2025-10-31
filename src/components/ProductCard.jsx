import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "./LoginModal"; 
import { Link } from "react-router-dom";

export function ProductCard({ p, layout = "grid" }) {
  const { cart, setCart, favorites, toggleFavorite } = useContext(CartContext);
  const { user } = useContext(AuthContext); // ✅ دسترسی به یوزر
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ حالت مودال
  const qty = cart[p.id] || 0;
  const isFav = favorites.some(f => f.id === p.id);

  const changeQty = (delta) => {
    if (!user) {
      setShowLoginModal(true); // ✅ اگر لاگین نیست مودال باز شود
      return;
    }
    const newCart = { ...cart };
    if (delta === 1) newCart[p.id] = (newCart[p.id] || 0) + 1;
    if (delta === -1) {
      if (newCart[p.id] > 1) newCart[p.id]--;
      else delete newCart[p.id];
    }
    setCart(newCart);
  };

  return (
    <>
      <div className={layout === "scroll" ? "col-card scroll-card col-12 col-md-6 col-lg-4" : "col-card col-12 col-md-6 col-lg-4 mt-5"}>
        {/* لینک صفحه جزئیات */}
        <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative img-wrapper">
              <img src={p.image} className="card-img-top rounded-3 product-img" alt={p.title} />

              {/* دکمه Favorite */}
              <button
                className="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-2 fav-btn"
                onClick={(e) => { e.preventDefault(); toggleFavorite(p); }}
              >
                <FontAwesomeIcon icon={faHeart} color={isFav ? "red" : "black"} />
              </button>
            </div>

            <div className="card-body d-flex flex-column">
              <p className="small fw-bold mb-2 text-truncate" title={p.title}>{p.title}</p>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <div className="price-product">
                  <div className="fw-bold text-dark price-product">{p.price}</div>
                  {p.oldPrice && <div className="text-muted text-decoration-line-through small price-product">{p.oldPrice}</div>}
                </div>
                <div className="controls-wrapper">
                  {qty > 0 ? (
                    <div className="quantity-box">
                      <button className="btn btn-sm btn-card-fill btn-minus" onClick={(e) => { e.preventDefault(); changeQty(-1); }}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="mx-2 small fw-bold text-white">{qty}</span>
                      <button className="btn btn-sm btn-card-fill btn-plus" onClick={(e) => { e.preventDefault(); changeQty(1); }}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-sm btn-card-fill btn-plus" onClick={(e) => { e.preventDefault(); changeQty(1); }}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ✅ مودال لاگین */}
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
