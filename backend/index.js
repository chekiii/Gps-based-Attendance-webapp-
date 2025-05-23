import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { studentRoutes } from "./Routes/student.js";
import cookieParser from "cookie-parser";
import { teacherRoutes } from "./Routes/teacher.js";
import http from "http";
import { WebSocketServer } from "ws"; // Correct import
import { getRoom, joinRoom } from "./RoomManager.js";
import { attendanceModel, classModel, teacherModel } from "./db.js";
import { getDistanceInMeters } from "./util.js";
const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
export const studentJwt = "student";
export const teacherJwt = "teacher";

let rooms = {}; // Define rooms object to manage rooms

async function main() {
  console.log("Connecting to MongoDB...");//OOcBqU5gfdlsNoFy  seegyeltshen
  
  try {
    await mongoose.connect(
      "mongodb+srv://upadhyagovinda01:lwVdKnOgtBB7pEMZ@cluster0.ld45rbh.mongodb.net/attendanceApp"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

try {
  main();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use("/student", studentRoutes);
  app.use("/teacher", teacherRoutes);

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg);

        const {
          type,
          code,
          student,
          location: studentLocation,
          classId,
        } = data;

        let classInfo = await classModel.findOne({
          _id: classId,
        });
        const room = getRoom(code);

        if (!room) {
          ws.send(JSON.stringify({ status: "error", message: "Invalid code" }));
          return;
        }

        let teacherInfo = classInfo.teacherId;
        teacherInfo = await teacherModel.findOne({
          _id: teacherInfo,
        });

        if (classId == room.currentclass) {
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0); // 00:00:00.000

          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999); // 23:59:59.999

          let attendance = await attendanceModel.find({
            student: student.id,
            session: room.session,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          });

          if (attendance.length != 0) {
            ws.send(
              JSON.stringify({
                status: "failed",
                message: `You have already marked attendance`,
              })
            );
            return;
          }
          let distance = getDistanceInMeters(
            room.location.latitude,
            room.location.longitude,
            data.location.latitude,
            data.location.longitude
          );
          if (distance <= classInfo.range) {
            let attendance = await attendanceModel.create({
              student: student.id,
              class: classInfo._id,
              session: room.session,
            });

            ws.send(
              JSON.stringify({
                status: "success",
                message: `Attendance done`,
              })
            );
          } else {
            ws.send(
              JSON.stringify({
                status: "failed",
                message: "You are out of range for the attendance",
              })
            );
          }
        } else {
          ws.send(
            JSON.stringify({
              status: "failed",
              message: "incorrect code",
            })
          );
        }
      } catch (err) {
        ws.send(
          JSON.stringify({ status: "error", message: "Invalid message format" })
        );
      }
    });
  });

  server.listen(3000, () => {
    console.log("listening...");
  });
} catch (error) {
  console.log(error);
}
