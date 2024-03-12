import "./App.css";
import DoctorDashboard from "./components /DoctorDashboard";
import Login from "./components /Login";
import Navbar from "./components /Navbar";
import PatientDashboard from "./components /PatientDashboard";
import Signup from "./components /Signup";
import AdminDashboard from "./components /AdminDashboard";
import ForgotPassword from "./components /ForgotPassword";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components /ProtectedRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { HisContext } from "./HisContext";

function App() {
  const { user } = useContext(HisContext);
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {user && user.role === "DOCTOR" && (
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
          )}
          {user && user.role === "PATIENT" && (
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
          )}
          {user && user.role === "ADMIN" && (
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
