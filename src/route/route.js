import Register from "../page/register/register";
import { Routes, Route } from "react-router-dom";
import Login from "../page/login/login";
import Home from "../page/home/home";
import Event from "../page/event/event";
function Page() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event/>} />
        </Routes>
    )
}

export default Page