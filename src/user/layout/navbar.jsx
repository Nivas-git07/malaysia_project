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
            className={location.pathname === "/user" ? "active" : ""}
            onClick={() => navigate("/user")}
          >
            HOME
          </li>

          <li
            className={location.pathname === "/user/event" ? "active" : ""}
            onClick={() => navigate("/user/event")}
          >
            EVENTS
          </li>

          <li
            className={location.pathname === "/user/membership" ? "active" : ""}
            onClick={() => navigate("/user/membershipabout")}
          >
            MEMBERSHIP
          </li>

          <li
            className={
              location.pathname === "/user/association" ? "active" : ""
            }
            onClick={() => navigate("/user/association")}
          >
            ASSOCIATIONS
          </li>
        </ul>

        <div className="mfsaPro-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="mfsaPro-menu mfsaPro-left">
          <li
            className={location.pathname === "/user/news" ? "active" : ""}
            onClick={() => navigate("/user/news")}
          >
            NEWS
          </li>
          <li
            className={location.pathname === "/user/about" ? "active" : ""}
            onClick={() => navigate("/user/about")}
          >
            ABOUT US
          </li>

          <li
            className={location.pathname === "/user/contact" ? "active" : ""}
            onClick={() => navigate("/user/contact")}
          >
            CONTACT
          </li>
        </ul>

        <div className="mfsaPro-user">
          <button
            className="btnOutline"
            onClick={() => {
              navigate("/user/register");
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
