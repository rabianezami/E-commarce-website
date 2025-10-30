import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function LogoutModal({ show, onConfirm, onCancel }) {
  if (!show) return null; // ✅ فقط وقتی show=true، نمایش داده می‌شود

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <button className="close-btn" onClick={onCancel}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <h2>Are you sure you want to logout?</h2>
        <p>You will need to log in again to continue.</p>

        <div className="logout-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Logout
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
