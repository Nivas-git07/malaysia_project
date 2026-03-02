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
import Manageuser from "../page/dashboard/Manageuser";

import AdminNotificationPage from "../page/dashboard/notification";


export default function AdminRoute() {
  return (
    <Routes>

      {/* LOGIN PAGE (NO SIDEBAR) */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ===== DASHBOARD ROUTES WITH SIDEBAR ===== */}


      <Route
        path="/home"
        element={
          <AdminLayout>
            <Home />
          </AdminLayout>
        }
      />
      <Route
        path="/notification"
        element={
          <AdminLayout>
            <AdminNotificationPage />
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
      
      {/* <Route
        path="/user"
        element={
          <AdminLayout>
            <Manageuser />
          </AdminLayout>
        }
      /> */}

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