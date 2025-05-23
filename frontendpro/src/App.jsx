import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import Teachersignup from "./pages/Teacher/Signup/Teachersignup";
import TeacherSignin from "./pages/Teacher/Signin/TeacherSignin";
import Studentsignup from "./pages/Student/Signup/Studentsignup";
import Studentsignin from "./pages/Student/Signin/Studentsignin";
import Teacherdashboard from "./pages/Teacher/Dashboard/Teacherdashboard";
import Dashboard from "./pages/Student/Dashboard/Dashboard";
import Attendance from "./pages/Student/Dashboard/Attendance";
import ViewAttendance from "./pages/Teacher/Dashboard/components/ViewAttendance";
function App() {
  return (
    <Routes className="body">
      <Route path="/" element={<Home />} />
      <Route path="/teacher/signup" element={<Teachersignup />} />
      <Route path="/teacher/signin" element={<TeacherSignin />} />
      <Route path="/student/signup" element={<Studentsignup />} />
      <Route path="/student/signin" element={<Studentsignin />} />
      <Route path="/teacher/dashboard" element={<Teacherdashboard />} />
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route
        path="/student/dashboard/attendance/:id"
        element={<Attendance />}
      />
      <Route path="/teacher/viewAttendance/:id" element={<ViewAttendance />} />
    </Routes>
  );
}

export default App;
