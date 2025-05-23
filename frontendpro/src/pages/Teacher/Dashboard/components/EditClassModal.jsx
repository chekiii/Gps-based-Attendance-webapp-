// components/AddClassModal.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const EditClassModal = ({ visible, onClose, onSubmit, classId }) => {
  if (!visible) return null;
  const [classInfo, setClassInfo] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function fetchClassInfo() {
    try {
      let res = await axios.get(
        `http://localhost:3000/teacher/getClass/${classId}`,
        {
          withCredentials: true,
        }
      );
      setClassInfo(res.data.classInfo);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchClassInfo();
    return () => {};
  }, []);
  async function updateClass(data) {
    data.startroll = Number(data.startroll);
    data.endroll = Number(data.endroll);
    try {
      let res = await axios.put(
        `http://localhost:3000/teacher/updateClass/${classId}`,
        data,
        {
          withCredentials: true,
        }
      );
      alert(res.data.msg);
      console.log(res.data.msg);
      reset();
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  }
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Update Class</h2>
        <form id="addClassForm" onSubmit={handleSubmit(updateClass)}>
          <label htmlFor="classname">Class Name:</label>
          <input
            type="text"
            {...register("classname", {
              minLength: {
                value: 3,
                message: "Min length of class is 3",
              },
              maxLength: {
                value: 20,
                message: "max length of class is 20",
              },
            })}
            id="className"
            name="classname"
            defaultValue={classInfo?.className}
          />
          {errors.classname && (
            <p style={{ color: "red" }}>{errors.classname.message}</p>
          )}
          <label htmlFor="classTime">Roll Number:</label>
          <input
            type="number"
            {...register("startroll", {
              required: "start roll is required",
            })}
            id="startroll"
            name="startroll"
            placeholder="start"
            defaultValue={classInfo?.startRoll}
          />
          <input
            type="number"
            {...register("endroll", {
              required: "end roll is required",
            })}
            id="endroll"
            name="endroll"
            placeholder="end"
            defaultValue={classInfo?.endRoll}
          />
          <label htmlFor="classTime">Range:</label>
          <input
            type="number"
            {...register("range", {
              required: "range is required",
              min: {
                value: 10,
                message: "Minimum range required is 10m",
              },
            })}
            id="range"
            name="range"
            placeholder="range"
            defaultValue={classInfo?.range}
          />
          <button type="submit" className="add-new-class-button">Update Class</button>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;
