import AdminLogin from "../page/login/AdminLogin";
import { Routes, Route } from "react-router-dom";

function AdminRoute() {
    return (
        <Routes>
        <Route path="/admin" element={<AdminLogin />} />
    </Routes>
    )
}
export default AdminRoute