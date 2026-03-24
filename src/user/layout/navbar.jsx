import logo from "../assets/logo.jpg";
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
    <nav className="mfsaPro-navbar">
      <div className="mfsaPro-container">
        <ul className="mfsaPro-menu mfsaPro-left">
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
          </li>
          <li
            onClick={() => {
              navigate("/about");
            }}
          >
            ABOUT US
          </li>
          <li>MEMBERSHIP</li>
          <li
            onClick={() => {
              navigate("/association");
            }}
          >
            ASSOCIATIONS
          </li>
        </ul>

        <div className="mfsaPro-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="mfsaPro-menu mfsaPro-left">
          <li>EVENTS</li>
          <li>NEWS</li>
          <li
            onClick={() => {
              navigate("/contact");
            }}
          >
            CONTACT
          </li>
        </ul>

        <div className="mfsaPro-user">
          <img src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg" />
          <span>Nivas</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
