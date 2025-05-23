import React from "react";
import "./TeacherSignin.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const schema = z.object({
  teacherId: z.string().min(1, { message: "Teacher ID is required" }),

  password: z.string().min(1, { message: "this field is required" }),
});
export default function TeacherSignin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function teacherSignin(data) {
    console.log(data);
    data.teacherId = Number(data.teacherId);
    try {
      let res = await axios.post(
        "http://localhost:3000/teacher/signin",

        data,

        {
          withCredentials: true,
        }
      );
      alert(res.data.msg);
      navigate("/teacher/dashboard");
    } catch (error) {
      console.log(error.response.data.msg);
      alert(error.response.data.msg);
    }
  }
  return (
    <div className="teachersigninmain">
      <div className="teachersignincontainer">
        <div className="image-side"></div>
        <div className="form-side">
          <div className="lang-switch">🇬🇧 EN</div>

          <div className="logo">
            <div className="icon"></div>
            <strong>Uni Logo</strong>
          </div>

          <h1>Attendance matters!</h1>
          <p>
            Marking attendance with a single click! Please login to your
            account.
          </p>

          <form onSubmit={handleSubmit(teacherSignin)}>
            <label>Teacher ID</label>
            <input
              type="text"
              {...register("teacherId")}
              placeholder="00000000000"
              required
            />
            {errors.teacherId && (
              <p style={{ color: "red" }}>{errors.teacherId.message}</p>
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
            <Link to="/teacher/signup">Sign Up For Free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
