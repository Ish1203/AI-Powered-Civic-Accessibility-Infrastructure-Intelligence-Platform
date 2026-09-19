import { Navigate, Outlet } from "react-router-dom";

interface RoleRouteProps {
  roles: string[];
}

const RoleRoute = ({ roles }: RoleRouteProps) => {
  const token = localStorage.getItem("access_token");
  const storedRole = localStorage.getItem("user_role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!storedRole || !roles.includes(storedRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;