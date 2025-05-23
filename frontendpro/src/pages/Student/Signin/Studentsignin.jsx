import React from "react";
import "./Studentsignin.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import {photo}  from "../../../assets/student images/studentlogin.png";
const schema = z.object({
  rollnumber: z.string().min(1, {
    message: "this field is required",
  }),
  password: z.string(),
});
export default function Studentsignin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function signinStudent(data) {
    data.rollnumber = Number(data.rollnumber);
    try {
      let res = await axios.post("http://localhost:3000/student/signin", data, {
        withCredentials: true,
      });
      alert(res.data.msg);
      navigate("/student/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  }
  return (
    <div className="studentsigninmain">
      <div className="studentsignincontainer">
        <div className="image-side"><img src={photo} alt="student" /></div>

        <div className="form-side">
          <div className="lang-switch">🇬🇧 EN</div>

          <div className="logo">
            <div className="icon"></div>
            <strong>Uni Logo</strong>
          </div>

          <h1>Attendance matters!</h1>
          <p>
            Mark your attendance with a single click! Please login to your
            account.
          </p>

          <form onSubmit={handleSubmit(signinStudent)}>
            <label>Roll Number</label>
            <input
              type="number"
              {...register("rollnumber")}
              placeholder="00000000000"
              required
            />
            {errors.rollnumber && (
              <p style={{ color: "red" }}>{errors.rollnumber.message}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              required
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="signup">
            Don’t have an account?{" "}
            <Link to="/student/signup">Sign Up For Free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
