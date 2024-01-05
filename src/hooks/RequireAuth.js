import { Outlet, Navigate, useLocation } from "react-router-dom";
import sidebar_menu from "../constants/sidebar-menu";
import SideBar from "../components/Sidebar";
import "../App.css";
const RequireAuth = ({ allowedRoles }) => {
  const storedAuth = localStorage.getItem("auth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
  const location = useLocation();
  const onLogout =()=>{
    localStorage.removeItem('auth');
  }
  return initialAuth?.roles === allowedRoles ? (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} onLogout={onLogout} />
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  ) : initialAuth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
