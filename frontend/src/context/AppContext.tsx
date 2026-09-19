import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface AppContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;

  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;

  toast: Toast | null;
  showToast: (
    message: string,
    type?: ToastType
  ) => void;
  hideToast: () => void;
}

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

interface Toast {
  message: string;
  type: ToastType;
}

const AppContext =
  createContext<AppContextValue | undefined>(
    undefined
  );

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [globalLoading, setGlobalLoading] =
    useState(false);

  const [toast, setToast] =
    useState<Toast | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "info"
  ) => {
    setToast({
      message,
      type,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => {
    setToast(null);
  };

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      mobileMenuOpen,
      setMobileMenuOpen,
      globalLoading,
      setGlobalLoading,
      toast,
      showToast,
      hideToast,
    }),
    [
      sidebarOpen,
      mobileMenuOpen,
      globalLoading,
      toast,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
};