import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
const ProtectedRoutes = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; // or a spinner

  if (!user) {
    // Not logged in
    return <Navigate to="/auth" replace />;
  }

  // User is allowed
  return <Outlet />; // Render nested routes/components
};

export default ProtectedRoutes;
