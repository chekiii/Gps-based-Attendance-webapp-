// components/ClassesContent.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { codeAtom, currentclassInfo } from "../../../../store/atom";

const ClassesContent = ({
  onBackToDashboard,
  onAddNewClass,
  onEditClass,
  onCode,
  setClassId,
}) => {
  const [classes, setClasses] = useState();
  const [code, setCode] = useRecoilState(codeAtom);
  const [currentClass, setcurrentClass] = useRecoilState(currentclassInfo);
  async function editClass(index) {
    onAddNewClass;
  }
  async function deleteClass(index) {
    try {
      let res = await axios.delete(
        `http://localhost:3000/teacher/deleteClass/${index}`,
        {
          withCredentials: true,
        }
      );
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  }
  async function closeRoom() {
    try {
      let res = await axios.post(
        "http://localhost:3000/teacher/close-room",
        {
          code: code,
        },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }
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

    return () => {};
  }, []);
  return (
    <div className="content" id="classesContent">
      <div className="top-bar">
        <h1>My Classes</h1>
        <button onClick={onBackToDashboard} className="back2-dashboard-button">
          ⬅️ Back2 Dashboard
        </button>
      </div>
      <div id="classList" className="card-container" >
        {classes?.map((singleClass, index) => (
          <div key={index} className="card">
            {" "}
            {/* Don't forget the 'key' prop */}
            <h3>{singleClass.className}</h3>
            <p>"{singleClass.startRoll} - {singleClass.endRoll}"</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "rgba(56, 158, 36, 0.7)", 
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => {
                    onCode(true);
                    setcurrentClass(singleClass._id);
                  }}
                >
                  Enable Attendance
                </button>
                <button
                  style={{
                    backgroundColor: "rgba(37, 100, 235, 0.7)", // Blue-600
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => closeRoom()}
                >
                  Disable Attendance
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => {
                    onEditClass(true);
                    setClassId(singleClass._id);
                  }}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(212, 57, 30, 0.7)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  edit
                </button>
                <button
                  onClick={() => deleteClass(singleClass._id)}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(135, 20, 18, 0.7)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <a href="#">View Attendance</a>
          </div>
        ))}
      </div>
      <button onClick={onAddNewClass} className="add-new-class-button">
        ➕ Add New Class
      </button>
    </div>
  );
};

export default ClassesContent;
