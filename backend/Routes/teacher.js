import { Router } from "express";
import {
  classValidator,
  teacherSigninValidator,
  teacherSignupValidator,
} from "../validation.js";
import bcrypt from "bcrypt";
import {
  attendanceModel,
  classModel,
  studentModel,
  teacherModel,
} from "../db.js";
import { teacherJwt, wss } from "../index.js";
import jwt from "jsonwebtoken";
import { teacherAuth } from "../auth.js";
import { createRoom, closeRoom } from "../RoomManager.js";
export const teacherRoutes = Router();

teacherRoutes.post("/signup", async function (req, res) {
  const teacherInfo = req.body;
  const verifiedData = teacherSignupValidator.safeParse(teacherInfo);
  if (!verifiedData.success) {
    res.status(400).json({
      msg: verifiedData.error.issues,
    });
    return;
  }
  try {
    let teacherExists = await teacherModel.findOne({
      teacherID: teacherInfo.teacherId,
    });
    if (teacherExists) {
      res.status(409).json({
        msg: "Teacher has already signed up please signin.",
      });
      return;
    }
    let salt = await bcrypt.genSalt(5);
    let hashedPassword = await bcrypt.hash(teacherInfo.password, salt);

    let createTeacher = await teacherModel.create({
      teacherID: teacherInfo.teacherId,
      password: hashedPassword,
      email: teacherInfo.email,
    });
    res.status(200).json({
      msg: "Signed up successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error please try again after some time",
    });
  }
});
teacherRoutes.post("/signin", async function (req, res) {
  const teacherInfo = req.body;
  const verifiedData = teacherSigninValidator.safeParse(teacherInfo);
  if (!verifiedData.success) {
    res.status(400).json({
      msg: verifiedData.error.issues,
    });
    return;
  }
  try {
    let teacherExists = await teacherModel.findOne({
      teacherID: teacherInfo.teacherId,
    });
    if (!teacherExists) {
      res.status(404).json({
        msg: "Teacher hasnt signed up please sign up first",
      });
      return;
    }
    let verifyPassword = bcrypt.compare(
      teacherInfo.password,
      teacherExists.password
    );
    if (verifyPassword) {
      let token = jwt.sign(
        {
          teacherId: teacherExists.teacherID.toString(),
        },
        teacherJwt,
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
  } catch (error) {
    console.log(error);
  }
});
teacherRoutes.use(teacherAuth);
teacherRoutes.post("/createClass", async function (req, res) {
  const classInfo = req.body;
  const verifiedData = classValidator.safeParse(classInfo);
  if (!verifiedData.success) {
    res.status(400).json({
      msg: verifiedData.error.issues,
    });
    return;
  }
  try {
    let teacher = await teacherModel.findOne({
      teacherID: req.teacherId,
    });
    let createClass = await classModel.create({
      className: classInfo.classname,
      startRoll: classInfo.startroll,
      endRoll: classInfo.endroll,
      teacherId: teacher._id,
      range: 100,
    });
    await studentModel.updateMany(
      { classRoom: null },
      { $set: { classRoom: [] } }
    );
    let addStudent = await studentModel.updateMany(
      {
        rollNumber: {
          $gte: classInfo.startroll,
          $lte: classInfo.endroll,
        },
      },

      {
        $push: {
          classRoom: createClass._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      msg: "class created and students added to the class",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "server error",
    });
    return;
  }
});
teacherRoutes.put("/updateClass/:classId", async function (req, res) {
  const classId = req.params.classId; // Get the class ID from the URL parameter
  const classInfo = req.body;

  try {
    const existingClass = await classModel.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ msg: "Class not found" });
    }

    // 2. Update the class data
    const updatedClass = await classModel.findByIdAndUpdate(
      classId,
      {
        $set: {
          className: classInfo.classname ?? existingClass.className, // Update only if provided
          startRoll: classInfo.startroll ?? existingClass.startRoll,
          endRoll: classInfo.endroll ?? existingClass.endRoll,
          range: classInfo.range,
          //  teacherId: teacher._id,  //Don't think teacher should be able to change.
        },
      },
      { new: true } // To get the updated class document
    );

    if (!updatedClass) {
      return res.status(500).json({ msg: "Failed to update class" }); //shouldn't happen
    }

    const oldStartRoll = existingClass.startRoll;
    const oldEndRoll = existingClass.endRoll;

    const newStartRoll = classInfo.startroll ?? existingClass.startRoll; //handle if startRoll or endRoll are undefined
    const newEndRoll = classInfo.endroll ?? existingClass.endRoll;

    // A. Remove the class from students in the *old* roll range
    if (oldStartRoll !== newStartRoll || oldEndRoll !== newEndRoll) {
      await studentModel.updateMany(
        {
          rollNumber: { $gte: oldStartRoll, $lte: oldEndRoll },
          classRoom: classId, // Only remove from students who *were* in this class
        },
        { $pull: { classRoom: classId } }
      );
    }

    // B. Add the class to students in the *new* roll range
    await studentModel.updateMany(
      {
        rollNumber: { $gte: newStartRoll, $lte: newEndRoll },
      },
      { $push: { classRoom: classId } },
      { new: true }
    );

    res.status(200).json({
      msg: "Class updated and student rosters adjusted",
      updatedClass: updatedClass,
    });
  } catch (error) {
    console.error("Error updating class:", error); // Log the full error for debugging
    res.status(500).json({
      msg: "Server error updating class",
      error: error.message, // Optionally send the error message
    });
  }
});

teacherRoutes.get("/getClass/:id", async function (req, res) {
  const id = req.params.id;
  try {
    let classInfo = await classModel.findOne({
      _id: id,
    });

    if (classInfo.length == 0) {
      res.status(200).json({
        msg: "No classes created",
      });
      return;
    }
    res.status(200).json({
      msg: "class found",
      classInfo: classInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "server error",
    });
    return;
  }
});
teacherRoutes.get("/getClasses", async function (req, res) {
  try {
    let teacher = await teacherModel.findOne({
      teacherID: req.teacherId,
    });
    let classes = await classModel.find({
      teacherId: teacher._id,
    });

    if (classes.length == 0) {
      res.status(200).json({
        msg: "No classes created",
      });
      return;
    }
    res.status(200).json({
      msg: "classes found",
      classes: classes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "server error",
    });
    return;
  }
});

teacherRoutes.delete("/deleteClass/:id", async function (req, res) {
  const classId = req.params.id;
  console.log(classId);
  try {
    let deleteClass = await classModel.deleteOne({
      _id: classId,
    });
    if (deleteClass.deletedCount == 0) {
      res.status(400).json({
        msg: "incorrect class Id",
      });
      return;
    }
    let removeStudent = await studentModel.updateMany(
      {
        classRoom: classId,
      },
      {
        $set: { classRoom: null },
      },
      {
        function(errors, docs) {
          if (errors) {
            console.log(errors);
          } else {
            console.log("updated docs", docs);
          }
        },
      }
    );
    res.status(200).json({
      msg: "class deleted and students removed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "server error",
    });
    return;
  }
});

teacherRoutes.post("/create-room", (req, res) => {
  const { code, location, currentclass, session } = req.body;
  console.log("request bodty", req.body);
  const teacherId = req.teacherId;
  console.log(code);
  if (!code || !location)
    return res.status(400).json({ message: "Code and location are required" });

  const created = createRoom(code, location, teacherId, currentclass, session);
  if (!created) {
    return res.status(400).json({ message: "Room already exists" });
  }

  return res.json({ message: `Room ${code} created.` });
});

// Teacher closes room
teacherRoutes.post("/close-room", (req, res) => {
  const { code } = req.body;
  const closed = closeRoom(code);
  if (!closed) return res.status(404).json({ message: "Room not found" });

  return res.json({ message: `Room ${code} closed.` });
});

teacherRoutes.get("/viewAttendance/:id", async function (req, res) {
  const classId = req.params.id;
  try {
    let attendance = await attendanceModel
      .find({
        class: classId,
      })
      .populate("class", "className")
      .populate("student", "rollNumber");
    console.log(attendance);
    return res.json({
      attendance: attendance,
    });
  } catch (error) {
    console.log(error);
  }
});
