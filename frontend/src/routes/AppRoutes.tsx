import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "../pages/public/Landing";
import ExploreMap from "../pages/public/ExploreMap";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/citizen/Dashboard";
import ReportIssue from "../pages/citizen/ReportIssue";
import MyReports from "../pages/citizen/MyReports";
import ReportDetail from "../pages/citizen/ReportDetail";
import Notifications from "../pages/citizen/Notifications";
import Profile from "../pages/citizen/Profile";

import AuthorityDashboard from "../pages/authority/Dashboard";
import AuthorityIssues from "../pages/authority/Issues";
import AuthorityIssueDetail from "../pages/authority/IssueDetail";
import Assignments from "../pages/authority/Assignments";
import Resolution from "../pages/authority/Resolution";
import Analytics from "../pages/authority/Analytics";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Departments from "../pages/admin/Departments";
import Categories from "../pages/admin/Categories";
import AuditLogs from "../pages/admin/AuditLogs";

import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Landing />} />
        <Route path="/explore-map" element={<ExploreMap />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ================= CITIZEN ================= */}

        <Route element={<RoleRoute roles={["citizen"]} />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/report"
            element={<ReportIssue />}
          />

          <Route
            path="/my-reports"
            element={<MyReports />}
          />

          <Route
            path="/reports/:id"
            element={<ReportDetail />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

        </Route>


        {/* ================= PROFILE ================= */}
        {/* All authenticated roles can access profile */}

        <Route
          element={
            <RoleRoute
              roles={["citizen", "authority", "admin"]}
            />
          }
        >
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>


        {/* ================= AUTHORITY ================= */}

        <Route element={<RoleRoute roles={["authority"]} />}>

          <Route
            path="/authority"
            element={<AuthorityDashboard />}
          />

          <Route
            path="/authority/issues"
            element={<AuthorityIssues />}
          />

          <Route
            path="/authority/issues/:id"
            element={<AuthorityIssueDetail />}
          />

          <Route
            path="/authority/assignments"
            element={<Assignments />}
          />

          <Route
            path="/authority/resolution"
            element={<Resolution />}
          />

          <Route
            path="/authority/analytics"
            element={<Analytics />}
          />

        </Route>


        {/* ================= ADMIN ================= */}

        <Route element={<RoleRoute roles={["admin"]} />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<Users />}
          />

          <Route
            path="/admin/departments"
            element={<Departments />}
          />

          <Route
            path="/admin/categories"
            element={<Categories />}
          />

          <Route
            path="/admin/audit-logs"
            element={<AuditLogs />}
          />

        </Route>


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;