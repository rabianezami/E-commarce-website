// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.css";

// داده داینامیک فوتر
const footerData = {
  about: {
    title: "About Us",
    text: "We are dedicated to providing top-notch client and invoice management solutions to freelancers worldwide."
  },
  links: [
    { label: "All Products", href: "/products/all" },
    { label: "Men", href: "/products/men" },
    { label: "Women", href: "/products/women" },
    { label: "Kids", href: "/products/kids" },
    { label: "Contact", href: "/contact" },
  ],
  contact: {
    email: "support@onlineshop.com",
    phone: "+93 748 945 001",
    socials: [
      { icon: faTwitter, href: "https://x.com/zia95355" },
      { icon: faLinkedin, href: "https://www.linkedin.com/in/rabia-zia-nezami-993989379/" },
      { icon: faInstagram, href: "https://www.instagram.com/?hl=en" }
    ]
  },
  copyright: "© 2025 Online Shop — All rights reserved."
};

export default function Footer({ data = footerData }) {
  return (
    <footer className="custom-footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">

          {/* About */}
          <div className="col-md-4">
            <h5 className="mb-3">{data.about.title}</h5>
            <p className="small">{data.about.text}</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="mb-3 quick-links">Quick Links</h5>
            <ul className="list-unstyled small">
              {data.links.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith("/products") || link.href.startsWith("/contact") ? (
                    <Link to={link.href} className="text-white">{link.label}</Link>
                  ) : (
                    <a href={link.href} className="text-white">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-5">
            <h5 className="mb-3">Contact Us</h5>
            <p className="small mb-1">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              {data.contact.email}
            </p>
            <p className="small mb-3">
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              {data.contact.phone}
            </p>
            <div>
              {data.contact.socials.map((social, idx) => (
                <a key={idx} href={social.href} className="text-light me-3 fs-4 footer-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <hr />

        <div className="text-center small pt-3">
          {data.copyright}
        </div>
      </div>
    </footer>
  );
}
