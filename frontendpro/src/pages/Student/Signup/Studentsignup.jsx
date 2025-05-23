import React from "react";
import "./Studentsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
const schema = z.object({
  rollnumber: z.string(),
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
export default function Studentsignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function signupStudent(data) {
    data.rollnumber = Number(data.rollnumber);
    try {
      let res = await axios.post("http://localhost:3000/student/signup", data, {
        withCredentials: true,
      });
      alert(res.data.msg);
      navigate("/student/signin");
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  }
  return (
    <div className="studentsignupmain">
      <div className="studentsignupcontainer">
        <div className="left">
          <div className="logo">📚 GPS-Attendance</div>
          <h2>Sign in to Attendance</h2>

          <div className="socials">
            <button>f</button>
            <button>G+</button>
            <button>in</button>
          </div>

          <p>or use your email account:</p>

          <form onSubmit={handleSubmit(signupStudent)} className="input-group">
            <input
              type="number"
              {...register("rollnumber")}
              placeholder="Rollnumber"
              id="rollnumber"
            />
            {errors.rollnumber && (
              <p style={{ color: "red" }}>{errors.rollnumber.message}</p>
            )}
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              id="email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
            <input
              type="password"
              {...register("password")}
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

          <Link to="/student/signin" className="sign-up-btn">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
