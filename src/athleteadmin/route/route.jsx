import AthleteLayout from "../layout/athletelayout";
import AthleteHome from "../page/Home/athletehome";
import { Routes, Route } from "react-router-dom";
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
    </>
  );
}
export default AthleteRoute;
