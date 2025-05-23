// App.jsx
import React, { use, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardContent from "./components/DashboardContent";
import ClassesContent from "./components/ClassesContent";
import AttendanceSection from "./components/AttendanceSection";
import ScheduleContent from "./components/ScheduleContent";
import AddClassModal from "./components/AddClassModal";
import ModalOverlay from "./components/ModalOverlay";
import "./Teacherdashboard.css";
import EditClassModal from "./components/EditClassModal";
import Code from "./components/Code";

const App = () => {
  const [classId, setClassId] = useState();
  const [activeSection, setActiveSection] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCodeModal, setshowCodeModal] = useState(false);
  const [sideBar, setSideBar] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "classes":
        return (
          <ClassesContent
            setClassId={setClassId}
            onBackToDashboard={() => setActiveSection("home")}
            onAddNewClass={() => setShowAddModal(true)}
            onEditClass={setShowEditModal}
            onCode={setshowCodeModal}
          />
        );
      case "attendance":
        return (
          <AttendanceSection
            onBackToDashboard={() => setActiveSection("home")}
            onBackToClassList={() => setActiveSection("classes")}
          />
        );
      case "schedule":
        return (
          <ScheduleContent
            onBackToDashboard={() => setActiveSection("home")}
            onAddClassToSchedule={() => setShowAddModal(true)}
          />
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="App">
      <div className="overlay" id="overlay" />
      <Sidebar
        onNavClick={setActiveSection}
        visible={sideBar}
        setVisible={setSideBar}
      />
      <div className="main">
        <Navbar
          toggleSidebar={() => {
            setSideBar(!sideBar);
            console.log(sideBar);
          }}
          toggleDarkMode={() => document.body.classList.toggle("dark-mode")}
        />
        {renderContent()}
      </div>
      <AddClassModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => {
          console.log("New class:", data);
          setShowAddModal(false);
        }}
      />
      <EditClassModal
        classId={classId}
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={(data) => {
          console.log("New class:", data);
          setEditAddModal(false);
        }}
      />
      <Code
        classId={classId}
        visible={showCodeModal}
        onClose={() => setshowCodeModal(false)}
        onSubmit={(data) => {
          console.log("New class:", data);
          setshowCodeModal(false);
        }}
      />
      <ModalOverlay
        visible={showConfirmModal}
        title="Confirm Action"
        content={<p>Are you sure you want to proceed?</p>}
        onConfirm={() => {
          setShowConfirmModal(false);
          console.log("Confirmed");
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default App;
