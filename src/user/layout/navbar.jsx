import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { get_home_data } from "../api/home_api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="mfsaPro-navbar">
      <div className="mfsaPro-container">
        <ul className="mfsaPro-menu mfsaPro-left">
          <li
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            HOME
          </li>

          <li
            className={location.pathname === "/event" ? "active" : ""}
            onClick={() => navigate("/event")}
          >
            EVENTS
          </li>

          <li
            className={location.pathname === "/membershipabout" ? "active" : ""}
            onClick={() => navigate("/membershipabout")}
          >
            MEMBERSHIP
          </li>

          <li
            className={location.pathname === "/association" ? "active" : ""}
            onClick={() => navigate("/association")}
          >
            ASSOCIATIONS
          </li>
        </ul>

        <div className="mfsaPro-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="mfsaPro-menu mfsaPro-left">
          <li
            className={location.pathname === "/news" ? "active" : ""}
            onClick={() => navigate("/news")}
          >
            NEWS
          </li>
          <li
            className={location.pathname === "/about" ? "active" : ""}
            onClick={() => navigate("/about")}
          >
            ABOUT US
          </li>

          <li
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>

        <div className="mfsaPro-user">
          <button
            className="btnOutsline"
            onClick={() => {
              navigate("/register");
            }}
          >
            MEMBER
          </button>
          <button
            className="btnFill"
            onClick={() => {
              navigate("/");
            }}
          >
            LOG IN
          </button>
          {/* <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
          <span>Nivas</span> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
