import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { studentInfo, studentLocation } from "../../../store/atom";

export default function Attendance() {
  const [ws, setWs] = useState();
  const { id } = useParams();
  const [student, setStudent] = useRecoilState(studentInfo);
  const [location, setLocation] = useRecoilState(studentLocation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  function submitCode(data) {
    if (!ws) {
      return;
    }
    //@ts-ignore

    let messagetobesend = {
      classId: id,
      type: "join",
      code: data.code,
      student: student,
      location: location,
    };
    //@ts-ignore
    messagetobesend = JSON.stringify(messagetobesend);
    //@ts-ignore
    ws.send(messagetobesend);
    //@ts-ignore
    reset();
  }
  useEffect(() => {
    const websocket = new WebSocket("http://localhost:3000");
    websocket.onmessage = (e) => {
      console.log(e.data);
      let message = JSON.parse(e.data);

      alert(message.message);
    };
    setWs(websocket);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleSubmit(submitCode)}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <label
          htmlFor="code"
          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          Enter Code:
        </label>
        <input
          {...register("code", { required: "This field is required" })}
          id="code"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        {errors.code && (
          <p style={{ color: "red", margin: 0 }}>{errors.code.message}</p>
        )}
        <button
          type="submit"
          style={{
            padding: "0.6rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
