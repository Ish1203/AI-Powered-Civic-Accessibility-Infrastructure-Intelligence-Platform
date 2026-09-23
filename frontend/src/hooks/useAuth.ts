import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import type { RegisterRequest, UserRole } from "../types/auth";

const API_URL = "http://127.0.0.1:8000";

const useAuth = () => {
  const auth = useAuthContext();

  // =========================
  // REGISTER
  // =========================

  const register = async (data: RegisterRequest) => {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
      }
    );

    console.log("REGISTER API RESPONSE:", response.data);

    return response.data;
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (data: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      {
        email: data.email,
        password: data.password,
      }
    );

    console.log("LOGIN API RESPONSE:", response.data);

    const responseData = response.data;

    const user = responseData.user ?? responseData;

    // Save JWT
    if (responseData.access_token) {
      localStorage.setItem(
        "access_token",
        responseData.access_token
      );
    }

    // Normalize role
    const normalizedUser = {
      ...user,
      role: String(user.role || "").toUpperCase() as UserRole,
    };

    // Save user
    auth.login(normalizedUser);

    return normalizedUser;
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("access_token");
    auth.logout();
  };

  // =========================
  // ROLE
  // =========================

  const role = String(
    auth.user?.role || ""
  ).toUpperCase();

  // =========================
  // RETURN
  // =========================

  return {
    ...auth,

    register,
    login,
    logout,

    isCitizen: role === "CITIZEN",

    isAuthority: role === "AUTHORITY",

    isAdmin: role === "ADMIN",
  };
};

export default useAuth;