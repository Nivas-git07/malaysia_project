import AdminLogin from "../page/login/AdminLogin";
import { Routes, Route } from "react-router-dom";
import ProfileForm from "../page/profile_page/ProfileForm";

function AdminRoute() {
    return (
        <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/profile" element={<ProfileForm />} />
    </Routes>
    )
}
export default AdminRoute