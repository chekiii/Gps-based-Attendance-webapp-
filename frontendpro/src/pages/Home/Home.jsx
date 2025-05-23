import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="logo">Attendance</div>
          <ul>
            <li className="home">Home</li>
            <li className="features">Features</li>
            <li className="about">About Us</li>
          </ul>
        </nav>

        <section className="hero">
          <div className="hero-text">
            <h1>
              Smart
              <br />
              <strong>
                Attendance Assistant
                <br />
                <span>Mark With Ease</span>
              </strong>
            </h1>
            <p>
              Present in Presence, Powered by GPS. Enable GPS On, and Attendance
              is Done. Your Location is Your Signature.
            </p>
            <div className="hero-buttons">
              <Link to="/teacher/signin" className="btn-primary">
                Teacher
              </Link>
              <Link to="/student/signin" className="btn-secondary">
                Student
              </Link>
            </div>
          </div>

          <div className="hero-image"></div>
        </section>
      </div>

      <div className="container1">
        <h2>&#x2022; Unique Features:</h2>
        <div className="features-box">
          <div className="feature-cardhome">
            <h3>
              1. <strong>Location-Based</strong>
            </h3>
            <p>
              Say goodbye to proxy! Our smart system uses real-time GPS to
              verify students’ presence within the classroom range, ensuring
              attendance is accurate and genuine.
            </p>
          </div>
          <div className="feature-cardhome">
            <h3>
              2. <strong>One Time Code</strong>
            </h3>
            <p>
              Teachers generate a unique, time-sensitive code during class. Only
              students within the defined range and roll number list can use it
              to mark attendance — no sharing, no cheating.
            </p>
          </div>
          <div className="feature-cardhome">
            <h3>
              3. <strong>RealTime Update</strong>
            </h3>
            <p>
              Teachers and students get instant feedback! The system updates
              attendance status in real time — no page refresh needed. Know
              immediately if attendance was marked successfully or if
              location/code verification failed.
            </p>
          </div>
        </div>
        <div className="contact-section">
          <h2>Support</h2>
        </div>
      </div>
    </>
  );
}
