import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../page/AdminLayout/AdminLayout";
import AdminLogin from "../page/login/AdminLogin";
import Home from "../page/dashboard/Home";
import Athlete from "../page/dashboard/Athlete";
import Calendar from "../page/dashboard/Calendar";
import Tickets from "../page/dashboard/Tickets";
import Report from "../page/dashboard/Report";
import News from "../page/dashboard/News";
import Settings from "../page/dashboard/Settings";



export default function AdminRoute() {
  return (
    <Routes>

      {/* LOGIN PAGE (NO SIDEBAR) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ===== DASHBOARD ROUTES WITH SIDEBAR ===== */}


      <Route
        path="/admin/home"
        element={
          <AdminLayout>
            <Home />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/athlete"
        element={
          <AdminLayout>
            <Athlete />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/calendar"
        element={
          <AdminLayout>
            <Calendar />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/tickets"
        element={
          <AdminLayout>
            <Tickets />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/report"
        element={
          <AdminLayout>
            <Report />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/news"
        element={
          <AdminLayout>
            <News />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        }
      />

      {/* DEFAULT ROUTE */}
      <Route path="/admin/home" element={<Navigate to="/admin/home" />} />

    </Routes>
  );
}