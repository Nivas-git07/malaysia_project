import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom";
import { get_home_data } from "../api/home_api";
import { useEffect, useState } from "react";
function Navbar() {
    const navigate = useNavigate();

    // const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {
        get_home_data()
            .then((res) => {
                console.log("Home data response:", res.data);
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);
    return (
        <nav className="navbars container">
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
                            src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                            alt="user"
                            className="userImg"
                        />
                        <span className="userName">{user.full_name}</span>
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