import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ show, onClose }) {
  const { login, register } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    const success = isRegister
      ? register(username, password)
      : login(username, password);

    if (success) {
      setUsername("");
      setPassword("");
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content p-4 rounded shadow">
        <h5 className="text-center mb-2">
          {isRegister ? "Create Your Account" : "Login to Continue"}
        </h5>
        <p className="text-center mb-3" style={{ fontSize: "0.9rem", color: "#555" }}>
          {isRegister
            ? "Join us today for a seamless and secure shopping experience."
            : "Please login to access your account and continue shopping securely."}
        </p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            name="login_user_xyz"
            id="login_user_xyz"
            className="form-control mb-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <input
            name="login_pass_xyz"
            id="login_pass_xyz"
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account?" : "Create a new account"}
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-outline" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-card-fill" type="submit">
                {isRegister ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; top:0; left:0; right:0; bottom:0;
          background: rgba(0,0,0,0.6);
          display: flex; justify-content: center; align-items: center;
          z-index: 1050;
        }
        .modal-content {
          background: white;
          width: 100%;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}
