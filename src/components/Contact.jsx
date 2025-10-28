import React, { useState, useEffect } from "react";
import "../styles/contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCommentDots, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@formspree/react";

export default function Contact({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  const [state, handleFormSubmit] = useForm("xkgvrobw");

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save form data with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      setIsTyping(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  // Validators
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value) return "Email is required";
        return validateEmail(value) ? "" : "Invalid email format";
      case "message":
        return value.trim() ? "" : "Message is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsTyping(true);

    if (name === "email") {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }, 400);
      return () => clearTimeout(timer);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      await handleFormSubmit(e);
      onSubmit?.(`Thank you, ${formData.name}! Your message was sent.`);
      setFormData({ name: "", email: "", message: "" });
      localStorage.removeItem("contactFormData");
    }
  };

  return (
    <section id="contact" className="contact-section py-5 mt-5">
      <div className="container mt-4">
        <div className="text-center text-lg-start">
          <h2 className="mb-4 contact-title fw-bold">Get In Touch</h2>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-10">
            <div className="card contact-form bg-white p-4 shadow-md rounded-4 w-100">
              <form onSubmit={handleSubmit} noValidate className="p-4">
                <div className="mb-4">
                  <label className="form-label fw-bold">Your Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Michael Jackson"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Your Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="jackson@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Your Message</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCommentDots} />
                    </span>
                    <textarea
                      name="message"
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      placeholder="Write me a text..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                  {errors.message && <div className="text-danger">{errors.message}</div>}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-gradient px-5 py-2 rounded-pill fw-bold">
                    Send <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
