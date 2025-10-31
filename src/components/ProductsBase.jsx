import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { enableDrag } from "./dragScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; 

export function ProductsBase({ category = "all", layout = "scroll" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        const filtered = category === "all" ? data : data.filter(p => p.category === category);
        setProducts(filtered);
      })
      .catch(err => console.error("Error loading products:", err));
  }, [category]);

  useEffect(() => {
    if (layout === "scroll") {
      const wrapper = document.querySelector(`.product-scroll-wrapper-${category}`);
      if (wrapper) enableDrag(wrapper);
    }
  }, [products, layout, category]);

  return (
    <section className="py-5 px-2 px-md-5 mx-2 mx-md-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>

        {layout === "scroll" && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-scroll btn-sm"
              onClick={() => {
                const wrapper = document.querySelector(`.product-scroll-wrapper-${category}`);
                wrapper.scrollBy({ left: -200, behavior: "smooth" });
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button
              className="btn btn-scroll btn-sm"
              onClick={() => {
                const wrapper = document.querySelector(`.product-scroll-wrapper-${category}`);
                wrapper.scrollBy({ left: 200, behavior: "smooth" });
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
      </div>

      {layout === "scroll" ? (
        <div className={`product-scroll-wrapper product-scroll-wrapper-${category}`}>
          <div className="d-flex gap-3">
            {products.map(p => (
              <ProductCard key={p.id} p={p} layout={layout} />
            ))}
          </div>
        </div>
      ) : (
        // Grid layout با استفاده از کلاس‌های Bootstrap
        <div className="row g-3">
          {products.map(p => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <ProductCard p={p} layout={layout} />
            </div>
          ))}
        </div>
      )}

      {layout === "scroll" && (
        <div className="text-center mt-3">
         <Link
           to={"/products/" + category}
           className="btn btn-viewAll"
         >
           View All
         </Link>
        </div>
      )}
    </section>
  );
}
