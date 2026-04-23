import logo from "../assets/logo.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_check } from "../api/home_api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  get_check()
    .then((res) => {
      const userData = res.data?.data || res.data;
      console.log("USER ROLE:", userData.role); 
      setUser(userData);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
}, []);

  return (
    <nav className="mfsaPro-navbar">
      <div className="mfsaPro-container">
        {/* LEFT MENU */}
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

        {/* LOGO */}
        <div className="mfsaPro-logo">
          <img src={logo} alt="logo" />
        </div>

        {/* RIGHT MENU */}
        <ul className="mfsaPro-menu mfsaPro-right">
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

          {/* 🔥 AUTH BUTTONS */}
          {!loading &&
            (user ? (
              <>
                <li>
                  <button
                    className="btnFill"
                    onClick={() => {
                      const role = user.role;

                      if (
                        role === "ADMIN" ||
                        role === "CLUB" ||
                        role === "STATE"
                      ) {
                        navigate("/admin/home");
                      } else if (role === "ATHLETE") {
                        navigate("/athlete/dashboard");
                      } else {
                        navigate("/");
                      }
                    }}
                  >
                    ACCOUNT
                  </button>
                </li>

                {/* Optional Logout */}
                {/* <li>
                  <button
                    className="btnOutsline"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                      navigate("/");
                    }}
                  >
                    LOGOUT
                  </button>
                </li> */}
              </>
            ) : (
              <>
                <li>
                  <button
                    className="btnOutsline"
                    onClick={() => navigate("/register")}
                  >
                    MEMBER
                  </button>
                </li>
                <li>
                  <button
                    className="btnFill"
                    onClick={() => navigate("/login")}
                  >
                    LOG IN
                  </button>
                </li>
              </>
            ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
