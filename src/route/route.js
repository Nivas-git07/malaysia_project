import Register from "../page/register/register";
import { Routes, Route } from "react-router-dom";
import Login from "../page/login/login";
import Home from "../page/home/home";
import Event from "../page/event/event";
import Eventview from "../page/eventdescription/eventview";
import About from "../page/about/about";
function Page() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/eventview" element={<Eventview />} />
            <Route path="/about" element={<About/>} />
        </Routes>
    )
}

export default Page