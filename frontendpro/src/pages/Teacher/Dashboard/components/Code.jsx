// components/AddClassModal.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { codeAtom, currentclassInfo } from "../../../../store/atom";
const Code = ({ visible, onClose, onSubmit }) => {
  if (!visible) return null;

  const [code, setCode] = useRecoilState(codeAtom);
  const [location, setLocation] = useState();
  const [currentClassInfo, setcurrentClassInfo] =
    useRecoilState(currentclassInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
  }, []);

  async function createRoom(data) {
    data.location = location;
    data.currentclass = currentClassInfo;
    console.log(data);
    setCode(data.code);
    try {
      let res = await axios.post(
        "http://localhost:3000/teacher/create-room",
        data,
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Set the attendance code</h2>
        <form id="addClassForm" onSubmit={handleSubmit(createRoom)}>
          <label htmlFor="classname">Attendance Code:</label>
          <input
            type="text"
            {...register("code", {
              minLength: {
                value: 3,
                message: "Min length of code is 3",
              },
              maxLength: {
                value: 20,
                message: "max length of code is 20",
              },
            })}
            id="attendanceCode"
            name="code"
          />
          {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
          <label htmlFor="classname"> Session Id:</label>
          <input
            type="text"
            {...register("session", {
              minLength: {
                value: 3,
                message: "Min length of code is 3",
              },
              maxLength: {
                value: 20,
                message: "max length of code is 20",
              },
            })}
            id="attendanceCode"
            name="session"
          />
          {errors.session && (
            <p style={{ color: "red" }}>{errors.session.message}</p>
          )}

          <button type="submit">Enable Attendance</button>
        </form>
      </div>
    </div>
  );
};

export default Code;
