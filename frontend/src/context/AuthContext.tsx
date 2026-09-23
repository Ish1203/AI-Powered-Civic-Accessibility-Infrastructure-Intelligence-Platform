import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id?: number | string;
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  is_active?: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  // =========================
  // LOAD USER FROM LOCAL STORAGE
  // =========================

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      return {
        ...parsedUser,
        role: String(
          parsedUser?.role || ""
        ).toUpperCase(),
      };
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");

      return null;
    }
  });

  // =========================
  // LOGIN
  // =========================

  const login = (userData: User) => {

    const normalizedUser: User = {
      ...userData,

      role: String(
        userData?.role || ""
      ).toUpperCase(),
    };

    console.log(
      "AUTH CONTEXT USER:",
      normalizedUser
    );

    setUser(normalizedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(normalizedUser)
    );
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// USE AUTH CONTEXT
// =========================

export const useAuthContext = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
};