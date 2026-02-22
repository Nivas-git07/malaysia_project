import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom";
import { get_home_data } from "../api/home_api";
import { useEffect, useState } from "react";
function Navbar() {
    const navigate = useNavigate();

    // const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // ⭐ Check session from backend
    useEffect(() => {
        get_home_data()
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);
    return (
        <nav className="navbar container">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <ul className="menu">
                <li onClick={() => { navigate("/") }}>HOME</li>
                <li onClick={() => { navigate("/about") }}>ABOUT US</li>
                <li onClick={() => { navigate("/allathelete") }}>ATHELETE</li>
                <li>MEMBERSHIP</li>
                <li onClick={() => { navigate("/association") }}>ASSOCIATIONS</li>
                <li onClick={() => { navigate("/event") }}>EVENTS</li>
                <li>NEWS</li>
                <li>CONTACT</li>
            </ul>

            <div className="navBtns">
                {user ? (
                    <div className="userBox">
                        <img
                            src={user.profile_image}
                            alt="user"
                            className="userImg"
                        />
                        <span className="userName">{user.name}</span>
                    </div>
                ) : (
                    <>
                        <button className="btnOutline" onClick={() => navigate("/register")}>
                            MEMBER
                        </button>
                        <button className="btnFill" onClick={() => navigate("/login")}>
                            LOG IN
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;