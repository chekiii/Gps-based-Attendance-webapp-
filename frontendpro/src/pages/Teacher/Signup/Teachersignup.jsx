import React from "react";
import "./Teachersignup.css";
import { data, Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
const schema = z.object({
  teacherId: z.string().min(1, { message: "Teacher ID is required" }),
  email: z.string().email().min(6).max(100),
  password: z
    .string()
    .min(5)
    .max(15)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});
export default function Teachersignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function teacherSignup(data) {
    data.teacherId = Number(data.teacherId);
    console.log(data);
    try {
      let res = await axios.post(
        "http://localhost:3000/teacher/signup",

        data,

        {
          withCredentials: true,
        }
      );
      alert(res.data.msg);
      navigate("/teacher/signin");
    } catch (error) {
      alert(error.response.data.msg);
    }
    reset();
  }
  return (
    <div className="teachersignupmain">
      <div className="teachersignupcontainer">
        <div className="left">
          <div className="logo">📚 GPS-Attendance</div>
          <h2>Sign in to Attendance</h2>
          <div className="socials">
            <button>f</button>
            <button>G+</button>
            <button>in</button>
          </div>
          <p>or use your email account:</p>
          <form onSubmit={handleSubmit(teacherSignup)} className="input-group">
            <input
              {...register("teacherId", {
                required: "Roll number is required",
              })}
              type="number"
              placeholder="Teacher Id"
            />
            {errors.teacherId && (
              <p style={{ color: "red" }}>{errors.teacherId.message}</p>
            )}
            <input
              {...register("email", { required: "email is required" })}
              type="email"
              placeholder="Email"
              id="email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
            <input
              {...register("password", {
                required: "password is required",
              })}
              type="password"
              placeholder="Password"
              id="password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}

            <button className="sign-in-btn" id="signupbtn">
              SIGN UP
            </button>
          </form>
        </div>

        <div className="right">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start clean attendance</p>
          <Link to="/teacher/signin" className="sign-up-btn">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
