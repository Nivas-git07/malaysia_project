import AdminLogin from "./admin/page/login/AdminLogin";
import AdminRoute from "./admin/route/route";
import Page from "./user/route/route";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/*" element={<Page />} />
          {/* <Route path="/*" element={<AdminRoute />} /> */}
        </Routes>
    </Router>
  )
}

export default App;
