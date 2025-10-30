// App.jsx
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import CartSidebar from "./components/CartSidebar";
import { ProductsPage } from "./components/ProductsPage";
import FavoritesPage from "./components/FavoritesPage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProductDetail from "./components/ProductDetail";

import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/products.css';
import './styles/modal.css';

function AppContent() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  
  const { darkMode } = useContext(ThemeContext);

  // بارگذاری محصولات
  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Router>
        {/* ✅ Navbar خارج از Routes → نمایش در همه صفحات */}
        <Navbar />

        {/* ✅ Routes فقط برای محتوای اصلی صفحات */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Products category="all" />
              </>
            }
          />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/FavoritesPage" element={<FavoritesPage />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>

        {/* ✅ CartSidebar و Chatbot همیشه در دسترس */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          products={products}
        />
        <Chatbot products={products} />
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (

   <AuthProvider>
     <ThemeProvider>
       <AppContent />
     </ThemeProvider>
   </AuthProvider>
 
  );
}

export default App;
