import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { studentInfo, studentLocation } from "../../../store/atom";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // Placeholder functions (you can define actual logic later)
  const closeSidebarMobile = () => {};
  const toggleSidebar = () => {};
  const toggleSearch = () => {};
  const toggleDarkMode = () => {};
  const showDashboard = () => {};
  const goBackToClassList = () => {};
  const [classes, setClasses] = useState();
  const [student, setStudent] = useRecoilState(studentInfo);
  const [location, setLocation] = useRecoilState(studentLocation);
  const navigate = useNavigate();
  async function fetchClasses() {
    try {
      let res = await axios.get("http://localhost:3000/student/classes", {
        withCredentials: true,
      });
      setClasses(res.data.classes.classRoom);
      let localStudent = {};
      localStudent.id = res.data.classes._id;
      console.log(res.data);
      setStudent(localStudent);
    } catch (error) {
      console.log(error);
    }
  }
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 10000,
        enableHighAccuracy: true,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // Use the location data as needed
  }
  function error(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert("User denied the request for geolocation.");
        break;
      case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case err.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  useEffect(() => {
    getLocation();
    fetchClasses();
    return () => {};
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#fff", // Optional: set a background color
      }}
    >
      <div className="overlay" id="overlay" onClick={closeSidebarMobile}></div>

      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <h2>📚 Dashboard</h2>
        <div className="vertical-text">@Attendance</div>
      </div>

      {/* Main */}
      <div className="main">
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
                id="searchInput"
              />
              <button className="search-btn" onClick={toggleSearch}>
                🔍
              </button>
            </div>
          </div>
          <div className="right-section">
            <div
              className="location"
              title="Location status"
              onClick={() => {
                /* Show location status */
              }}
            >
              📍
            </div>
            <div
              className="toggle-dark"
              onClick={toggleDarkMode}
              title="Toggle dark mode"
            >
              🌙
            </div>
            <div className="profile">👤 Profile</div>
          </div>
        </div>

        {/* My Classes Content */}
        <div className="content" id="classesContent">
          <div className="top-bar">
            <h1>My Classes</h1>
          </div>
          <div id="classList" className="card-container" >
            {classes?.map((classInfo) => (
              <div className="card"
    
                onClick={() =>
                  navigate(`/student/dashboard/attendance/${classInfo._id}`)
                }
              >
                <h2 style={{ margin: "0 0 0.5rem 0" }}>
                  {classInfo.className}
                </h2>
                <p style={{ margin: 0 }}>
                  Roll Number Range: {classInfo.startRoll} - {classInfo.endRoll}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Section */}
        <div
          id="attendanceSection"
          className="content"
          style={{ display: "none" }}
        >
          <div className="top-bar">
            <h1 id="attendanceHeader">📊 Attendance Register</h1>
            <button onClick={showDashboard} className="back2-dashboard-button">
              ⬅️ Back2 Dashboard
            </button>
            <button
              onClick={goBackToClassList}
              className="back2-classlist-button back2-dashboard-button"
              style={{ backgroundColor: "#939aa5" }}
            >
              ⬅️ Back
            </button>
          </div>
          <div
            id="classListAttendance"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              padding: "1rem",
            }}
          ></div>

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
              {/* Dynamically filled by JS */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
