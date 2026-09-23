import React from "react";
import {
  BarChart3,
  Bell,
  FileText,
  Home,
  Map,
  Settings,
  ShieldCheck,
  Users,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

type Role = "citizen" | "authority" | "admin";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  role?: Role;
}

const citizenLinks = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/my-reports", label: "My reports", icon: FileText },
  { to: "/explore-map", label: "Civic map", icon: Map },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const authorityLinks = [
  { to: "/authority", label: "Operations", icon: Home },
  { to: "/authority/issues", label: "Issue queue", icon: FileText },
  { to: "/authority/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/explore-map", label: "Civic map", icon: Map },
];

const adminLinks = [
  { to: "/admin", label: "Administration", icon: Home },
  { to: "/admin/users", label: "Users & roles", icon: Users },
  { to: "/admin/departments", label: "Departments", icon: Settings },
  { to: "/admin/categories", label: "Categories", icon: Settings },
  { to: "/admin/audit-logs", label: "Audit logs", icon: FileText },
];

export default function Sidebar({
  open = false,
  onClose,
  role,
}: SidebarProps) {

  // =========================
  // CURRENT USER
  // =========================

  const { user } = useAuth();

  // =========================
  // CURRENT ROLE
  // =========================

  const currentRole =
    String(user?.role || role || "citizen").toLowerCase() as Role;

  // =========================
  // NAVIGATION LINKS
  // =========================

  const links =
    currentRole === "authority"
      ? authorityLinks
      : currentRole === "admin"
      ? adminLinks
      : citizenLinks;

  // =========================
  // USER NAME
  // =========================

  const userName = user?.name || "User";

  // =========================
  // USER INITIALS
  // =========================

  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <>
      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white",
          "transition-transform duration-200 lg:translate-x-0",
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">

          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <ShieldCheck size={19} />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-slate-950">
                AccessPath
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Civic intelligence
              </p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

        </div>

        {/* =========================
            CITIZEN REPORT BUTTON
        ========================= */}

        {currentRole === "citizen" && (
          <div className="border-b border-slate-100 px-4 py-4">

            <NavLink
              to="/report"
              onClick={onClose}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <Plus size={15} />
              Report an issue
            </NavLink>

          </div>
        )}

        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="flex-1 overflow-y-auto px-3 py-4">

          <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">

            {links.map(({ to, label, icon: Icon }) => (

              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
                  ].join(" ")
                }
              >

                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />

                    <span className="flex-1">
                      {label}
                    </span>

                    {label === "Notifications" && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        3
                      </span>
                    )}
                  </>
                )}

              </NavLink>

            ))}

          </div>

          {/* =========================
              SYSTEM
          ========================= */}

          <p className="mt-7 px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            System
          </p>

          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              [
                "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold",
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
              ].join(" ")
            }
          >
            <Settings size={17} />
            Profile & preferences
          </NavLink>

        </nav>

        {/* =========================
            CURRENT USER
        ========================= */}

        <div className="border-t border-slate-100 p-4">

          <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-50">

            {/* Initials */}

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-extrabold text-slate-700">
              {initials}
            </div>

            {/* User information */}

            <div className="min-w-0 flex-1">

              <p className="truncate text-xs font-bold text-slate-900">
                {userName}
              </p>

              <p className="truncate text-[10px] capitalize text-slate-400">
                {currentRole} account
              </p>

            </div>

            <ChevronDown
              size={14}
              className="text-slate-400"
            />

          </button>

        </div>

      </aside>
    </>
  );
}