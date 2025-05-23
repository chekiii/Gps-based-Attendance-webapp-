import { Router } from "express";
import {
  studentSigninValidator,
  studentSignupValidator,
} from "../validation.js";
import { classModel, studentModel } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { studentJwt } from "../index.js";
import { studentAuth } from "../auth.js";
export const studentRoutes = Router();

studentRoutes.post("/signup", async function (req, res) {
  const studentInfo = req.body;
  const verifiedData = studentSignupValidator.safeParse(studentInfo);
  if (!verifiedData.success) {
    res.status(400).json({
      msg: verifiedData.error.issues,
    });
    return;
  }

  try {
    let userExist = await studentModel.findOne({
      rollNumber: studentInfo.rollnumber,
    });
    if (userExist) {
      res.status(409).json({
        msg: "Student is already registered please signin",
      });
      return;
    }
    let salt = await bcrypt.genSalt(5);
    let hashedPassword = await bcrypt.hash(studentInfo.password, salt);
    let createUser = await studentModel.create({
      rollNumber: studentInfo.rollnumber,
      password: hashedPassword,
      email: studentInfo.email,
    });
    res.status(200).json({
      msg: "Student registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error please try again after sometimes",
    });
  }
});

studentRoutes.post("/signin", async function (req, res) {
  const studentInfo = req.body;
  const verifiedData = studentSigninValidator.safeParse(studentInfo);
  if (!verifiedData.success) {
    res.status(400).json({
      msg: verifiedData.error.issues,
    });
    return;
  }
  try {
    let studentExists = await studentModel.findOne({
      rollNumber: studentInfo.rollnumber,
    });
    if (!studentExists) {
      res.status(404).json({
        msg: "Student hasnt signed up please sign up first",
      });
      return;
    }
    let verifyPassword = bcrypt.compare(
      studentInfo.password,
      studentExists.password
    );
    if (verifyPassword) {
      let token = jwt.sign(
        {
          rollnumber: studentExists.rollNumber.toString(),
        },
        studentJwt,
        {
          expiresIn: "12h",
        }
      );
      res.cookie(`token`, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        msg: "signed in successfully",
        token: token,
      });
    } else {
      res.status(400).json({
        msg: "wrong password",
      });
    }
  } catch (error) {}
});

studentRoutes.use(studentAuth);
studentRoutes.get("/classes", async function (req, res) {
  let studentroll = req.studentId;
  try {
    let student = await studentModel
      .findOne({
        rollNumber: studentroll,
      })
      .select("-password")
      .populate("classRoom");
    console.log(student);

    res.json({
      msg: "classes found",
      classes: student,
    });
  } catch (error) {
    console.log(error);
  }
});
