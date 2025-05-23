// components/AddClassModal.jsx
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
const AddClassModal = ({ visible, onClose, onSubmit }) => {
  if (!visible) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function createClass(data) {
    data.startroll = Number(data.startroll);
    data.endroll = Number(data.endroll);
    try {
      let res = await axios.post(
        "http://localhost:3000/teacher/createClass",
        data,
        {
          withCredentials: true,
        }
      );
      alert(res.data.msg);
      console.log(res.data.msg);
      reset();
    } catch (error) {
      alert(error.response.data.msg[0].message);
      console.log(error.response.data.msg[0]);
    }
  }
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Class</h2>
        <form id="addClassForm" onSubmit={handleSubmit(createClass)}>
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
          />
          <input
            type="number"
            {...register("endroll", {
              required: "end roll is required",
            })}
            id="endroll"
            name="endroll"
            placeholder="end"
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
          />
          <button className="add-new-class-button" type="submit">Add Class</button>
        </form>
      </div>
    </div>
  );
};

export default AddClassModal;
