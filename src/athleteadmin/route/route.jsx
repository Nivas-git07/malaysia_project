import AthleteLayout from "../layout/athletelayout";
import AthleteHome from "../page/Home/athletehome";
import { Routes, Route } from "react-router-dom";
import AthleteEvent from "../page/event/athleteevent";
import AthleteProfile from "../page/profile/athleteprofile";
import AthleteMembership from "../page/membership/athletemembership";
import AthleteMembershipPayment from "../components/membership/memberpayment";
import AthleteMembersipPurchaseCenter from "../components/membership/membershippurchase";
import AthleteMembershipALLStatus from "../components/membership/membershipallstatus";
import AthleteMembershipStatus from "../components/membership/membershipstatus";
function AthleteRoute() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AthleteLayout>
              <AthleteHome />
            </AthleteLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/events"
          element={
            <AthleteLayout>
              <AthleteEvent />
            </AthleteLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/profile"
          element={
            <AthleteLayout>
              <AthleteProfile />
            </AthleteLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/membership"
          element={
            <AthleteLayout>
              <AthleteMembership />
            </AthleteLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/membership/status/payment/:planName"
          element={
            <AthleteLayout>
              <AthleteMembershipPayment />
            </AthleteLayout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/membership/all"
          element={
            <AthleteLayout>
              <AthleteMembershipALLStatus />
            </AthleteLayout>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/membership/status/:id"
          element={
            <AthleteLayout>
              <AthleteMembershipStatus />
            </AthleteLayout>
          }
        />
      </Routes>
    </>
  );
}
export default AthleteRoute;
