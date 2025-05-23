// components/ScheduleContent.jsx
import React from "react";

const ScheduleContent = ({ onBackToDashboard, onAddClassToSchedule }) => {
  return (
    <div className="content" id="scheduleContent">
      <div className="top-bar">
        <h1>📅 Schedule</h1>
        <button onClick={onBackToDashboard} className="back2-dashboard-button">
          ⬅️ Back2 Dashboard
        </button>
      </div>
      <div className="schedule-container">
        <div className="days-row">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div
              className="day-tab"
              key={day}
              onClick={() => console.log(`Show ${day}`)}
            >
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <div id="classListForDay" className="class-list">
          <table id="scheduleTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>{/* Classes dynamically added */}</tbody>
          </table>
        </div>
        <button onClick={onAddClassToSchedule} className="add-new-class-button">
          ➕ Add New Class
        </button>
      </div>
    </div>
  );
};

export default ScheduleContent;
