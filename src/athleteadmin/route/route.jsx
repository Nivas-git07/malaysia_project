import AthleteLayout from "../layout/athletelayout";
import AthleteHome from "../page/Home/athletehome";
import { Routes, Route, useLocation } from "react-router-dom";
import AthleteEvent from "../page/event/athleteevent";
import AthleteProfile from "../page/profile/athleteprofile";
import AthleteMembership from "../page/membership/athletemembership";
import AthleteMembershipPayment from "../components/membership/memberpayment";
import AthleteMembersipPurchaseCenter from "../components/membership/membershippurchase";
import AthleteMembershipALLStatus from "../components/membership/membershipallstatus";
import AthleteMembershipStatus from "../components/membership/membershipstatus";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../hooks/animateroute";

function AthleteRoute() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteHome />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/events"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteEvent />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteProfile />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/membership/status"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteMembership />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/membership/status/payment/:planName"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteMembershipPayment />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/membership/all"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteMembershipALLStatus />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/membership/status/:id"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteMembershipStatus />
              </AthleteLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/membership/purchase"
          element={
            <PageWrapper>
              <AthleteLayout>
                <AthleteMembersipPurchaseCenter />
              </AthleteLayout>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
export default AthleteRoute;
