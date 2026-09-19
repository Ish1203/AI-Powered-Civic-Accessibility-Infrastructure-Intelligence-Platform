import { Navigate, Outlet } from "react-router-dom";

interface RoleRouteProps {
  roles: string[];
}

const RoleRoute = ({ roles }: RoleRouteProps) => {
  const token = localStorage.getItem("access_token");
  const storedUser = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role?.toUpperCase();

  const allowedRoles = roles.map((role) =>
    role.toUpperCase()
  );

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;