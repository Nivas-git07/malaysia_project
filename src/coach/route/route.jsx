import { AnimatePresence } from "framer-motion";
import { CoachHome } from "../page/home/coachhome";
import { Coachsupport } from "../page/support/coachsupport";
import { Coachprofile } from "../page/profile/coachprofile";
import { Routes, Route, useLocation } from "react-router-dom";
import CoachLayout from "../layout/coachlayout";
import PageWrapper from "../../athleteadmin/hooks/animateroute";
import CoachNotificationPage from "../page/notification/notification";
function Coachroute() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/notification"
          element={
            <PageWrapper>
              <CoachLayout>
                <CoachNotificationPage />
              </CoachLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <CoachLayout>
                <CoachHome />
              </CoachLayout>
            </PageWrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <PageWrapper>
              <CoachLayout>
                <Coachprofile />
              </CoachLayout>
            </PageWrapper>
          }
        />

        <Route
          path="/support"
          element={
            <PageWrapper>
              <CoachLayout>
                <Coachsupport />
              </CoachLayout>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default Coachroute;
