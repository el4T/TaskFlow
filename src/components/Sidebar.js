import React from "react";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose, darkMode, toggleDarkMode, onLogout }) {
  return (
    <>
      {/* Fundal opac */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div
        className={`sidebar ${isOpen ? "open" : ""} ${darkMode ? "dark" : ""}`}
      >
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <button onClick={toggleDarkMode} className="sidebar-btn">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button onClick={onLogout} className="sidebar-btn logout">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
