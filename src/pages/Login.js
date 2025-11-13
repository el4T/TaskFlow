// src/pages/Login.js
import React, { useState } from "react";
import { loadUsers, loginUser } from "../utils/auth";

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = loadUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Email sau parolă incorectă!");
      return;
    }

    loginUser(found);
    onLoginSuccess(found);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PAROLĂ CU ARATĂ/ASCUNDE */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Parolă"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Ascunde" : "Arată"}
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Nu ai un cont?{" "}
        <button className="link" onClick={onSwitchToRegister}>
          Creează cont
        </button>
      </p>
    </div>
  );
}
