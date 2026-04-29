import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import StateManagement from "../page/dashboard/statemanagement";
import PageWrapper from "../hooks/animateroute";
import ProtectedRoute from "../../auth/ProtectedRoute";
export default function AdminRoute() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="login"
          element={
            <PageWrapper>
              <AdminLogin />
            </PageWrapper>
          }
        />

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
            <PageWrapper>
              <AdminLayout>
                <AdminNotificationPage />
              </AdminLayout>
            </PageWrapper>
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
            <PageWrapper>
              <AdminLayout>
                <Athlete />
              </AdminLayout>
            </PageWrapper>
          }
        />
        <Route
          path="state-management"
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
              <PageWrapper>
                <AdminLayout>
                  <StateManagement />
                </AdminLayout>
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="calendar"
          element={
            <PageWrapper>
              <AdminLayout>
                <Calendar />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="tickets"
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
              <PageWrapper>
                <AdminLayout>
                  <Tickets />
                </AdminLayout>
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="record"
          element={
            <PageWrapper>
              <AdminLayout>
                <Record />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="report"
          element={
            <PageWrapper>
              <AdminLayout>
                <Report />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="gallery"
          element={
            <PageWrapper>
              <AdminLayout>
                <Gallery />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="news"
          element={
            <PageWrapper>
              <AdminLayout>
                <News />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membershipapproval"
          element={
            <PageWrapper>
              <AdminLayout>
                <Manageuser />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membership/status"
          element={
            <PageWrapper>
              <AdminLayout>
                <MembersipRenew />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membership/status/payment/:planName"
          element={
            <PageWrapper>
              <AdminLayout>
                <AdminMembershipPayment />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membership/status/:id"
          element={
            <PageWrapper>
              <AdminLayout>
                <MembershipStatus />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membershipallstatus"
          element={
            <PageWrapper>
              <AdminLayout>
                <MembershipALLStatus />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="membership/status/new"
          element={
            <PageWrapper>
              <AdminLayout>
                <MembersipPurchase />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="settings"
          element={
            <PageWrapper>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="home/state/:id"
          element={
            <PageWrapper>
              <AdminLayout>
                <StateList />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="home/club/:id"
          element={
            <PageWrapper>
              <AdminLayout>
                <ClubList />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="athlete/:id"
          element={
            <PageWrapper>
              <AdminLayout>
                <AthleteProfile />
              </AdminLayout>
            </PageWrapper>
          }
        />

        <Route
          path="about"
          element={
            <PageWrapper>
              <AdminLayout>
                <About />
              </AdminLayout>
            </PageWrapper>
          }
        />
        <Route
          path="home"
          element={
            <PageWrapper>
              <AdminLayout>
                <Authenticate />
              </AdminLayout>
            </PageWrapper>
          }
        />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </AnimatePresence>
  );
}
