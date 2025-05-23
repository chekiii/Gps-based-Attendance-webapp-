// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onNavClick, visible, setVisible }) => {
  return (
    <div className={visible ? "sidebar" : "sidebar"} id="sidebar">
      <h2>📚 Dashboard</h2>
      <a
        href="#"
        className="nav-link"
        onClick={() => {
          onNavClick("home");
          setVisible(false);
        }}
      >
        Home
      </a>
      <a href="#" className="nav-link" onClick={() => onNavClick("attendance")}>
        📊 Attendance
      </a>
      <a href="#" className="nav-link" onClick={() => onNavClick("schedule")}>
        📅 Schedule
      </a>
      <a href="#" className="nav-link" onClick={() => onNavClick("classes")}>
        👨‍🏫 My Classes
      </a>
      <a href="#" className="nav-link">
        ⚙️ Settings
      </a>
    </div>
  );
};

export default Sidebar;
