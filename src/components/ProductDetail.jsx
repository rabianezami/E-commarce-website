// ProductDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "./ProductsWithDescription"; // fetch از public/products.json
import { CartContext } from "../context/CartContext";
import "../styles/productDetile.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then(products => {
      const found = products.find(p => p.id === parseInt(id));
      setProduct(found);
      if (found) {
        setSimilarProducts(products.filter(p => p.category === found.category && p.id !== found.id));
      }
    });
  }, [id]);

  if (!product) return <p className="text-center mt-5">Product not found!</p>;

  const addToCart = (p) => {
    const newCart = { ...cart };
    newCart[p.id] = (newCart[p.id] || 0) + 1;
    setCart(newCart);
  };

  return (
    <div className="product-detail-page container py-5">
      <Link to="/" className="btn btn-link mb-4">← Back to Home</Link>

      <div className="row mt-4">
        {/* تصویر محصول اصلی */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid rounded-3 product-detail-img" 
          />
        </div>

        {/* جزئیات و دکمه Add to Cart */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <p className="mt-3" style={{ whiteSpace: "pre-line" }}>{product.description}</p>
          <p className="fw-bold mt-3 mb-1">Price: {product.price}</p>
          {product.oldPrice && <p className="text-muted text-decoration-line-through">{product.oldPrice}</p>}

          <button className="btn btn-card-fill mt-2" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* محصولات مشابه */}
      <h3 className="mt-5">Similar Products</h3>
      <div className="row g-3 mt-2">
        {similarProducts.map(p => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <Link to={`/product/${p.id}`} className="text-decoration-none text-dark">
                <img 
                  src={p.image} 
                  className="card-img-top rounded-3 similar-product-img" 
                  alt={p.title} 
                />
              </Link>
              <div className="card-body p-2 d-flex flex-column">
                <Link to={`/product/${p.id}`} className="text-decoration-none text-dark mb-auto">
                  <p className="small text-truncate mb-0">{p.title}</p>
                  <p className="small fw-bold mb-2">{p.price}</p>
                </Link>

                {/* Add to Cart برای محصولات مشابه */}
                <button
                  className="btn btn-sm btn-card-fill mt-1"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
