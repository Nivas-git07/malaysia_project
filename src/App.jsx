import AdminLogin from "./admin/page/login/AdminLogin";
import AdminRoute from "./admin/route/route";
import Page from "./user/route/route";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import AthleteRoute from "./athleteadmin/route/route";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Page />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/athlete/*" element={<AthleteRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
