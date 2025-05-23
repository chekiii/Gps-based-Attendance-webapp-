import jwt from "jsonwebtoken";
import { studentJwt, teacherJwt } from "./index.js";

export function teacherAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({
      msg: "Bad request",
    });
  }
  try {
    let teacherId = jwt.verify(token, teacherJwt);

    if (!teacherId) {
      res.status(401).json({
        msg: "Teacher isnt signed in.Please signin first",
      });
      return;
    }
    req.teacherId = teacherId.teacherId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export function studentAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({
      msg: "Bad request",
    });
  }
  try {
    let studentId = jwt.verify(token, studentJwt);

    if (!studentId) {
      res.status(401).json({
        msg: "Student isnt signed in.Please signin first",
      });
      return;
    }
    req.studentId = studentId.rollnumber;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
