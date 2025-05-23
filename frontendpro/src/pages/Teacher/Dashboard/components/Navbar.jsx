// components/Navbar.jsx
import React from "react";

const Navbar = ({ toggleSidebar, toggleDarkMode }) => {
  return (
    <div className="navbar">
      <div className="left-section">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for..."
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
      </div>
      <div className="right-section">
        <div className="location" title="Location status">
          📍
        </div>
        <div
          className="toggle-dark"
          title="Toggle dark mode"
          onClick={toggleDarkMode}
        >
          🌙
        </div>
        <div className="profile">👤 Profile</div>
      </div>
    </div>
  );
};

export default Navbar;
