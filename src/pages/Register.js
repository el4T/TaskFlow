// src/pages/Register.js
import React, { useState, useMemo } from "react";
import { loadUsers, saveUsers } from "../utils/auth";

const PASSWORD_REGEX =
  /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).*$/;

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const checks = useMemo(() => ({
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]/.test(password),
    match: password === confirm && password.length > 0,
  }), [password, confirm]);

  const isPasswordValid = PASSWORD_REGEX.test(password) && checks.match;

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || email.trim().length < 3) {
      setError("Introduceți un email valid.");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setError(
        "Parola nu respectă cerințele. Verificați checklist-ul de mai jos."
      );
      return;
    }

    if (password !== confirm) {
      setError("Parola și confirmarea nu coincid.");
      return;
    }

    const users = loadUsers();

    if (users.some((u) => u.email === email)) {
      setError("Email deja înregistrat!");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    saveUsers(users);

    alert("Cont creat cu succes!");
    setEmail("");
    setPassword("");
    setConfirm("");
    onSwitchToLogin();
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PAROLĂ */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        {/* CONFIRMĂ PAROLĂ */}
        <div className="password-field">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            required
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? "Ascunde" : "Arată"}
          </button>
        </div>

        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <PasswordChecklist checks={checks} />
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button type="submit" disabled={!isPasswordValid}>
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <button className="link" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

function PasswordChecklist({ checks }) {
  const item = (ok, text) => (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        color: ok ? "#9AE6B4" : "#E2E8F0",
        fontSize: 14,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: ok ? "#16A34A" : "#374151",
        }}
      />
      <div>{text}</div>
    </div>
  );

  return (
    <div style={{ marginTop: 6 }}>
      {item(checks.length, "Minim 12 caractere")}
      {item(checks.lower, "Cel puțin o literă mică")}
      {item(checks.upper, "Cel puțin o literă mare")}
      {item(checks.digit, "Cel puțin o cifră")}
      {item(checks.special, "Cel puțin un caracter special")}
      {item(checks.match, "Parolă confirmată")}
    </div>
  );
}
