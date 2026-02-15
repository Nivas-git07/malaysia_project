import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar container">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <ul className="menu">
                <li onClick={() => { navigate("/") }}>HOME</li>
                <li>ABOUT US</li>
                <li>MEMBERSHIP</li>
                <li>ASSOCIATIONS</li>
                <li  onClick={() => { navigate("/event") }}>EVENTS</li>
                <li>NEWS</li>
                <li>CONTACT</li>
            </ul>

            <div className="navBtns">
                <button className="btnOutline" onClick={() => { navigate("/register") }}>MEMBER</button>
                <button className="btnFill" onClick={() => { navigate("/login") }}>LOG IN</button>
            </div>
        </nav>
    )
}

export default Navbar;