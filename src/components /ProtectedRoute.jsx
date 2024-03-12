import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { HisContext } from "../HisContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(HisContext);
  return user == null ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
