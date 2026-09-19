import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Role = "citizen" | "authority" | "admin";

interface AppLayoutProps {
  children: React.ReactNode;
  role?: Role;
  title?: string;
}

export default function AppLayout({
  children,
  role = "citizen",
  title,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <Sidebar
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <Navbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
