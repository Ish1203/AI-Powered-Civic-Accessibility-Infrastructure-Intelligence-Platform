import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface RoleRouteProps {
  roles: string[];
}

const RoleRoute = ({ roles }: RoleRouteProps) => {
  const { user, isAuthenticated } = useAuthContext();

  // Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize current user's role
  const userRole = String(user.role || "").toUpperCase();

  // Normalize allowed roles
  const allowedRoles = roles.map((role) =>
    String(role).toUpperCase()
  );

  console.log("========== ROLE ROUTE ==========");
  console.log("Current URL:", window.location.pathname);
  console.log("User:", user);
  console.log("User Role:", userRole);
  console.log("Allowed Roles:", allowedRoles);
  console.log("================================");

  // Role is not allowed
  if (!allowedRoles.includes(userRole)) {
    const homeRoutes: Record<string, string> = {
      CITIZEN: "/dashboard",
      AUTHORITY: "/authority",
      ADMIN: "/admin",
    };

    return (
      <Navigate
        to={homeRoutes[userRole] || "/login"}
        replace
      />
    );
  }

  // Role allowed
  return <Outlet />;
};

export default RoleRoute;