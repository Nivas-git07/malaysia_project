import logo from "../assets/logo.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useAuth } from "../../auth/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { role, isAuthenticated, isLoading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const renderAuthActions = () => {
    if (isLoading) return null;
    if (isAuthenticated) {
      return (
        <li>
          <button
            className="btnFill"
            onClick={() => {
              if (
                role === "ADMIN" ||
                role === "CLUB" ||
                role === "STATE" ||
                role === "SUPERADMIN"
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
      );
    }
    return (
      <>
        <li>
          <button className="btnOutsline" onClick={() => navigate("/register")}>
            MEMBER
          </button>
        </li>
        <li>
          <button className="btnFill" onClick={() => navigate("/login")}>
            LOG IN
          </button>
        </li>
      </>
    );
  };

  return (
    <nav className="mfsaPro-navbar">
      <div className="mfsaPro-container">
        <div className="mfsaMobileTopbar">
          <button
            className="mfsaMobileMenuBtn"
            aria-label="Toggle navigation menu"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            {isDrawerOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
          <div className="mfsaMobileLogo">
            <img src={logo} alt="logo" />
          </div>
        </div>

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
          {renderAuthActions()}
        </ul>
      </div>

      <div
        className={`mfsaMobileBackdrop ${isDrawerOpen ? "open" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <aside className={`mfsaMobileDrawer ${isDrawerOpen ? "open" : ""}`}>
        <ul className="mfsaMobileNavList">
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
          {renderAuthActions()}
        </ul>
      </aside>
    </nav>
  );
}

export default Navbar;
