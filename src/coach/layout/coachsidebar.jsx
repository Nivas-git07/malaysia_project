import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import logo from "../../user/assets/logo.png";
import { logout } from "../../admin/api/auth_api";
import { useAuth } from "../../auth/AuthContext";
import { MdSupportAgent } from "react-icons/md";
import { Home, User, Calendar, Ticket, LogOut, Menu } from "lucide-react";
// import "../style/sidebar.css";

export default function CoachSidebar() {
  const [open, setOpen] = useState(false);
  const { logout: logoutSession } = useAuth();

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22} />
      </div>

      <div
        className={`mfsaSidebarBackdrop ${open ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`sidebar ${open ? "show" : ""}`}>
        {/* LOGO */}
        <div className="sidebarTop">
          <div className="sidebarBanner">
            <img src={logo} alt="logo" className="sidebarLogo" />
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebarMenu">
          <NavLink
            to="/coach/dashboard"
            className="menuItem"
            onClick={closeSidebar}
          >
            <Home size={20} />
            <span>Home Dashboard</span>
          </NavLink>

          <NavLink
            to="/coach/support"
            className="menuItem"
            onClick={closeSidebar}
          >
            <MdSupportAgent size={20} />
            <span>Support</span>
          </NavLink>

          <NavLink
            to="/coach/profile"
            className="menuItem"
            onClick={closeSidebar}
          >
            <User size={20} />
            <span>Profile Settings</span>
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <NavLink
          to="/"
          className="logoutBar"
          onClick={async () => {
            closeSidebar();
            try {
              await logout();
            } catch (error) {
              // Session cleanup must continue even if server logout fails
            }
            await logoutSession();
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </aside>
    </>
  );
}
