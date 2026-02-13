import Register from "../page/register";
import { Routes, Route } from "react-router-dom";

function Page() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
        </Routes>
    )
}

export default Page