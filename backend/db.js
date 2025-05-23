import mongoose, { Types } from "mongoose";
import { number } from "zod";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
  },
  classRoom: [
    {
      type: Types.ObjectId,
      ref: "Class",
      default: [],
    },
  ],
});

const teacherSchema = new Schema({
  teacherID: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const attendanceSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "Students",
    },

    class: {
      type: Types.ObjectId,
      ref: "Class",
    },
    session: String,
  },
  {
    timestamps: true, // <-- this adds createdAt and updatedAt automatically
  }
);

const classRoomSchema = new Schema({
  range: {
    type: Number,
  },
  startRoll: {
    type: Number,
    required: true,
  },
  endRoll: {
    type: Number,
    required: true,

    validate: {
      validator: function (value) {
        return value > this.startRoll;
      },
      message: "End roll number must be greater then start roll number",
    },
  },
  className: {
    type: String,
    required: true,
  },

  teacherId: {
    type: Types.ObjectId,
    ref: "Teachers",
  },
});

export const studentModel = mongoose.model("Students", studentSchema);
export const teacherModel = mongoose.model("Teachers", teacherSchema);
export const classModel = mongoose.model("Class", classRoomSchema);
export const attendanceModel = mongoose.model("Attendance", attendanceSchema);
