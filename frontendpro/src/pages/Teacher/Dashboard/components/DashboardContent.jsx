// components/DashboardContent.jsx
import React from "react";

const DashboardContent = () => {
  return (
    <div className="content" id="mainContent">
      <div className="top-bar">
        <h1>Welcome, Teacher!</h1>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="emoji-box">✅</div>
          <h3>Start Attendance</h3>
          <p>Enable student check-in with GPS.</p>
        </div>
        <div className="card">
          <div className="emoji-box">📍</div>
          <h3>Set GPS Range</h3>
          <p>Define the allowed distance for marking attendance.</p>
        </div>
        <div className="card">
          <div className="emoji-box">🔐</div>
          <h3>Set Code</h3>
          <p>Enter a unique code for this session.</p>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="emoji-box">📊</div>
          <h3>Attendance Report</h3>
          <p>See summary of attendance this week.</p>
        </div>
        <div className="card">
          <div className="image-block"></div>
          <h3>Visual Block</h3>
          <p>This area can be used for images or graphs.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
