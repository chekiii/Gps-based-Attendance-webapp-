// components/AttendanceSection.jsx
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceSection = ({ onBackToDashboard, onBackToClassList }) => {
  const [classes, setClasses] = useState();
  const navigate = useNavigate();
  async function fetchClasses() {
    try {
      let res = await axios.get("http://localhost:3000/teacher/getClasses", {
        withCredentials: true,
      });
      console.log(res.data);
      setClasses(res.data.classes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchClasses();
  }, []);
  return (
    <div className="content" id="attendanceSection">
      <div className="top-bar">
        <h1 id="attendanceHeader">📊 Attendance Register</h1>
        <button onClick={onBackToDashboard} className="back2-dashboard-button">
          ⬅️ Back2 Dashboard
        </button>
        <button
          onClick={onBackToClassList}
          className="back2-classlist-button back2-dashboard-button"
          style={{ marginLeft: "10px", opacity: "0.7" }}
        >
          ⬅️ Back
        </button>
      </div>
      <div id="classListAttendance" className="card-container">
        {classes?.map((singleClass) => (
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "16px 24px",
              gap: "10px",

              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#333",
                margin: 0,
              }}
            >
              {singleClass.className}
            </h1>
            <button
              style={{
                backgroundColor: "rgba(14, 124, 250, 0.84)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
              onClick={() =>
                navigate(`/teacher/viewAttendance/${singleClass._id}`)
              }
            >
              View attendance
            </button>
          </div>
        ))}
      </div>
      <div
        id="attendanceTableContainer"
        style={{ display: "none", overflowX: "auto" }}
      >
        <h2 id="classNameHeader" style={{ marginBottom: "20px" }}></h2>
        <table
          id="attendanceTable"
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "600px",
            textAlign: "center",
          }}
        >
          {/* Dynamic attendance rows go here */}
        </table>
      </div>
    </div>
  );
};

export default AttendanceSection;
