import Register from "../page/register/register";
import { Routes, Route } from "react-router-dom";
import Login from "../page/login/login";
function Page() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Page