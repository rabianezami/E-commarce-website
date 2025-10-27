import React from "react";
import "../styles/hero.css";

// داده‌های هیرو
const heroData = {
  title: "Find the Best Online Deals & Trusted Products Across the Globe",
  subtitle:
    "Every purchase allows you to access quality products at great prices, enjoy fast and reliable delivery, and experience a seamless shopping journey that meets all your daily needs.",
  image: "/images/hero-picc.jpg",
};

function Hero() {
  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* متن سمت چپ */}
          <div className="col-lg-6 text-white order-2 order-lg-1">
            <h1 className="fw-bold mb-2 mt-4 pt-5">{heroData.title}</h1>
            <p className="mb-4">{heroData.subtitle}</p>
          </div>

          {/* تصویر سمت راست */}
          <div className="col-lg-6 text-center order-1 order-lg-2">
            <img
              src={heroData.image}
              alt="Hero Image"
              className="img-fluid hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
