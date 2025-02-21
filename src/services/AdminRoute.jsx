import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service"; 

const AdminRoute = () => {
  const role = AuthService.getCurrentUserRole();

  return role === "ADMIN" ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
