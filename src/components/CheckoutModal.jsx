import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/checkout.css";

function CheckoutModal({ show, handleClose, products = [] }) {
  const { cart, setCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({ name: "", card: "", expiry: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setErrors({});
      setFormData({ name: "", card: "", expiry: "" });
    }
  }, [show]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!/^\d{16}$/.test(formData.card.replace(/\D/g, "")))
      newErrors.card = "Card number must be 16 digits.";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required.";
    else {
      const [year, month] = formData.expiry.split("-").map(Number);
      const expiryDate = new Date(year, month - 1);
      if (expiryDate < new Date()) newErrors.expiry = "Card has expired.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("✅ Your order has been successfully placed!");
      setCart({});
      setFormData({ name: "", card: "", expiry: "" });
      setErrors({});
      setLoading(false);
      handleClose();
    }, 1500);
  };

  const total = Object.keys(cart).reduce((sum, id) => {
    const p = products.find((pr) => pr.id == id);
    if (!p) return sum;
    const price = parseInt(p.price.toString().replace(/[^\d]/g, ""));
    return sum + price * cart[id];
  }, 0);

  if (!cart || Object.keys(cart).length === 0) return null;

  return (
    <Modal
      show={show}
      onHide={() => { setErrors({}); handleClose(); }}
      centered
      className={darkMode ? "dark-modal" : ""}
    >
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup className="mb-3">
          {Object.keys(cart).map((id) => {
            const p = products.find((pr) => pr.id == id);
            if (!p) return null;
            const price = parseInt(p.price.toString().replace(/[^\d]/g, ""));
            return (
              <ListGroup.Item
                key={id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{p.title} × {cart[id]}</span>
                <strong>{price * cart[id]}؋</strong>
              </ListGroup.Item>
            );
          })}
        </ListGroup>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              id="card"
              type="text"
              value={formData.card}
              onChange={handleChange}
              isInvalid={!!errors.card}
            />
            <Form.Control.Feedback type="invalid">{errors.card}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              id="expiry"
              type="month"
              value={formData.expiry}
              onChange={handleChange}
              isInvalid={!!errors.expiry}
            />
            <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 btn-card-fill" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Processing...
              </>
            ) : (
              `Pay ${total}؋`
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutModal;
