import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:8000";

const useAuth = () => {
  const auth = useAuthContext();

  // =========================
  // REGISTER
  // =========================

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      }
    );

    console.log(
      "REGISTER API RESPONSE:",
      response.data
    );

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

    console.log(
      "LOGIN API RESPONSE:",
      response.data
    );

    const responseData = response.data;

    /*
      Possible backend response:

      {
        access_token: "...",
        token_type: "bearer",
        user: {
          id: 1,
          name: "Anmol",
          email: "anmol@test.com",
          role: "CITIZEN"
        }
      }

      OR:

      {
        id: 1,
        name: "Anmol",
        email: "anmol@test.com",
        role: "CITIZEN"
      }
    */

    const user =
      responseData.user ?? responseData;

    // Save JWT token
    if (responseData.access_token) {
      localStorage.setItem(
        "access_token",
        responseData.access_token
      );
    }

    // Save user in AuthContext
    auth.login(user);

    return user;
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("access_token");

    auth.logout();
  };

  // =========================
  // RETURN
  // =========================

  const role =
    auth.user?.role?.toUpperCase();

  return {
    ...auth,

    register,
    login,
    logout,

    isCitizen:
      role === "CITIZEN",

    isAuthority:
      role === "AUTHORITY",

    isAdmin:
      role === "ADMIN",
  };
};

export default useAuth;