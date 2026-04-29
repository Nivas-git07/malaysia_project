import AdminLogin from "./admin/page/login/AdminLogin";
import AdminRoute from "./admin/route/route";
import Page from "./user/route/route";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AthleteRoute from "./athleteadmin/route/route";
import MFSAInitialLoader from "./components/MFSAInitialLoader";
import ProtectedRoute from "./auth/ProtectedRoute";
function App() {
  return (
    <MFSAInitialLoader>
      <Router>
        <Routes>
          <Route path="/*" element={<Page />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                allowedRoles={["SUPERADMIN", "STATE", "CLUB", "ADMIN"]}
                loginPath="/admin/login"
              >
                <AdminRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/athlete/*"
            element={
              <ProtectedRoute allowedRoles={["ATHLETE"]}>
                <AthleteRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </MFSAInitialLoader>
  );
}

export default App;
