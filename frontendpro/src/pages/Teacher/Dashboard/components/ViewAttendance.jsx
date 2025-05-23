import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewAttendance() {
  const { id } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchAttendance(classId) {
      try {
        let res = await axios.get(
          `http://localhost:3000/teacher/viewAttendance/${classId}`,
          { withCredentials: true }
        );
        setAttendanceData(res.data.attendance);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    }

    fetchAttendance(id);
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "#1e293b" }}>
        Attendance Records
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e2e8f0" }}>
            <th style={headerStyle}>Roll Number</th>
            <th style={headerStyle}>Class Name</th>
            <th style={headerStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record._id}>
              <td style={cellStyle}>{record.student.rollNumber}</td>
              <td style={cellStyle}>{record.class.className}</td>
              <td style={cellStyle}>
                {new Date(record.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle = {
  padding: "12px",
  borderBottom: "2px solid #cbd5e1",
};

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};
