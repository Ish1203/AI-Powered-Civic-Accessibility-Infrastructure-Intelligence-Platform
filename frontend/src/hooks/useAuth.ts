import {
  useAuthContext,
} from "../context/AuthContext";

export const useAuth = () => {
  const auth = useAuthContext();

  return {
    ...auth,

    isCitizen: auth.user?.role === "CITIZEN",
    isAuthority: auth.user?.role === "AUTHORITY",
    isAdmin: auth.user?.role === "ADMIN",
  };
};

export default useAuth;
