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
import StateList from "../page/dashboard/state";
import AdminNotificationPage from "../page/dashboard/notification";
import AthleteProfile from "../page/dashboard/athleteprofile";
import Authenticate from "../page/authenticate/authenticate";
import ClubList from "../page/dashboard/club";
import Gallery from "../page/dashboard/gallery";
import Record from "../page/dashboard/record";
import About from "../page/dashboard/about";
import MembersipRenew from "../page/dashboard/membershiprenew";
import MembershipStatus from "../page/membership/membershipstatus";
import MembersipPurchase from "../page/membership/membershippurchase";
import AdminMembershipPayment from "../page/membership/memberpayment";
import MembershipALLStatus from "../page/membership/membershipallstatus";
export default function AdminRoute() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      {/* <Route
        path="/home"
        element={
          <AdminLayout>
            <Home />
          </AdminLayout>
        }
      /> */}
      <Route
        path="notification"
        element={
          <AdminLayout>
            <AdminNotificationPage />
          </AdminLayout>
        }
      />
      {/* <Route
        path="/notification"
        element={
          <AdminLayout>
            <AdminNotificationPage />
          </AdminLayout>
        }
      /> */}

      <Route
        path="athlete"
        element={
          <AdminLayout>
            <Athlete />
          </AdminLayout>
        }
      />

      <Route
        path="calendar"
        element={
          <AdminLayout>
            <Calendar />
          </AdminLayout>
        }
      />

      <Route
        path="tickets"
        element={
          <AdminLayout>
            <Tickets />
          </AdminLayout>
        }
      />
      <Route
        path="record"
        element={
          <AdminLayout>
            <Record />
          </AdminLayout>
        }
      />

      
      <Route
        path="report"
        element={
          <AdminLayout>
            <Report />
          </AdminLayout>
        }
      />

      <Route
        path="gallery"
        element={
          <AdminLayout>
            <Gallery />
          </AdminLayout>
        }
      />

      <Route
        path="news"
        element={
          <AdminLayout>
            <News />
          </AdminLayout>
        }
      />

      <Route
        path="membership"
        element={
          <AdminLayout>
            <Manageuser />
          </AdminLayout>
        }
      />

      <Route
        path="membershiprenew"
        element={
          <AdminLayout>
            <MembersipRenew />
          </AdminLayout>
        }
      />

      <Route
        path="membershippayment/:planName"
        element={
          <AdminLayout>
            <AdminMembershipPayment />
          </AdminLayout>
        }
      />

      <Route
        path="membership/status/:id"
        element={
          <AdminLayout>
            <MembershipStatus />
          </AdminLayout>
        }
      />

      <Route
        path="membershipallstatus"
        element={
          <AdminLayout>
            <MembershipALLStatus />
          </AdminLayout>
        }
      />

      <Route
        path="membershippurchase"
        element={
          <AdminLayout>
            <MembersipPurchase />
          </AdminLayout>
        }
      />

      <Route
        path="settings"
        element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        }
      />

      <Route
        path="home/state/:id"
        element={
          <AdminLayout>
            <StateList />
          </AdminLayout>
        }
      />

      <Route
        path="home/club/:id"
        element={
          <AdminLayout>
            <ClubList />
          </AdminLayout>
        }
      />

      <Route
        path="athlete/:id"
        element={
          <AdminLayout>
            <AthleteProfile />
          </AdminLayout>
        }
      />

      <Route
        path="about"
        element={
          <AdminLayout>
            <About />
          </AdminLayout>
        }
      />
      <Route
        path="home"
        element={
          <AdminLayout>
            <Authenticate />
          </AdminLayout>
        }
      />
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}
