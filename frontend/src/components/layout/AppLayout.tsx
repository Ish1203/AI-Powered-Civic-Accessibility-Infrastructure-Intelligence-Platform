import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";

type Role = "citizen" | "authority" | "admin";

interface AppLayoutProps {
  children: React.ReactNode;
  role?: Role;
  title?: string;
}

export default function AppLayout({
  children,
  role,
  title,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { user } = useAuth();

  // =========================
  // CURRENT USER ROLE
  // =========================

  const userRole = String(
    user?.role || ""
  ).toLowerCase() as Role | "";

  // Explicit role prop has priority,
  // otherwise use logged-in user's role.
  const currentRole: Role =
    role ||
    (userRole === "authority"
      ? "authority"
      : userRole === "admin"
      ? "admin"
      : "citizen");

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        role={currentRole}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="min-h-screen lg:pl-[260px]">

        {/* =========================
            NAVBAR
        ========================= */}

        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* =========================
            PAGE CONTENT
        ========================= */}

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}