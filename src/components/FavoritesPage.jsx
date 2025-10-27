import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // ❤️ آیکن قلب

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    if (cart[id]) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    }
  };

  return (
    <>
      <section className="container py-4 mt-5">
        <h3 className="mb-4 mt-5 fw-bold">My Favorites</h3>

        <div className="row g-3" id="favoritesGrid">
          {favorites.length === 0 ? (
            <p className="text-muted">No favorites yet.</p>
          ) : (
            favorites.map((p) => (
              <div key={p.id} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm border-0">
                  <div className="position-relative img-wrapper">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="card-img-top rounded-3 product-img"
                    />
                    <button
                      className="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-2"
                      onClick={() => removeFavorite(p.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} color="red" />
                    </button>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p
                      className="small fw-bold mb-2 text-truncate"
                      title={p.title}
                    >
                      {p.title}
                    </p>
                    <div className="mt-auto fw-bold text-dark price-product">
                      {p.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
