import AthleteLayout from "../layout/athletelayout";
import AthleteHome from "../page/Home/athletehome";
import { Routes, Route } from "react-router-dom";
import AthleteEvent from "../page/event/athleteevent";
import AthleteProfile from "../page/profile/athleteprofile";
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
    </>
  );
}
export default AthleteRoute;
