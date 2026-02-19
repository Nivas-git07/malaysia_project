import AdminLogin from "../page/login/AdminLogin";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../page/dashboard/sidebar";
import Home from "../page/dashboard/Home";
import Athlete from "../page/dashboard/Athlete";
import Calendar from "../page/dashboard/Calendar";
import Tickets from "../page/dashboard/Tickets";
import Report from "../page/dashboard/Report";
import News from "../page/dashboard/News";
import Settings from "../page/dashboard/Settings";

/* ===== ADMIN LAYOUT (Sidebar + Content) ===== */
function AdminLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  );
}

function AdminRoute() {
  return (
    <Routes>

      {/* LOGIN ROUTE */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* DASHBOARD ROUTES */}
      <Route
        path="/home"
        element={
          <AdminLayout>
            <Home />
          </AdminLayout>
        }
      />

      <Route
        path="/athlete"
        element={
          <AdminLayout>
            <Athlete />
          </AdminLayout>
        }
      />

      <Route
        path="/calendar"
        element={
          <AdminLayout>
            <Calendar />
          </AdminLayout>
        }
      />

      <Route
        path="/tickets"
        element={
          <AdminLayout>
            <Tickets />
          </AdminLayout>
        }
      />

      <Route
        path="/report"
        element={
          <AdminLayout>
            <Report />
          </AdminLayout>
        }
      />

      <Route
        path="/news"
        element={
          <AdminLayout>
            <News />
          </AdminLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        }
      />

      {/* DEFAULT ROUTE */}
      <Route path="*" element={<Navigate to="/home" />} />

    </Routes>
  );
}

export default AdminRoute;