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
import Manageuser from "../page/dashboard/membership";
import StateList from "../page/dashboard/clublist";
import AdminNotificationPage from "../page/dashboard/notification";
import AthleteProfile from "../page/dashboard/athleteprofile";

export default function AdminRoute() {
  return (
    <Routes>

      <Route path="/login" element={<AdminLogin />} />

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

      <Route
        path="/user"
        element={
          <AdminLayout>
            <Manageuser />
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

      <Route
        path="/home/state/:id"
        element={
          <AdminLayout>
            <StateList />
          </AdminLayout>
        }
      />

      <Route
        path="/athlete/:id"
        element={
          <AdminLayout>
            <AthleteProfile />
          </AdminLayout>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />

    </Routes>
  );
}