import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import logo from "../../user/assets/logo.jpg";
import { logout } from "../../admin/api/auth_api";

import { Home, User, Calendar, Ticket, LogOut, Menu } from "lucide-react";

export default function AthleteSidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <>
   
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22} />
      </div>

      <aside className={`sidebar ${open ? "show" : ""}`}>
        
        {/* LOGO */}
        <div className="sidebarTop">
          <div className="sidebarBanner">
            <img src={logo} alt="logo" className="sidebarLogo" />
          </div>
        </div>

        {/* MENU */}
        <nav className="sidebarMenu">
          <NavLink to="/dashboard" className="menuItem" onClick={closeSidebar}>
            <Home size={20} />
            <span>Home Dashboard</span>
          </NavLink>

          <NavLink to="/events" className="menuItem" onClick={closeSidebar}>
            <Calendar size={20} />
            <span>Event Registration</span>
          </NavLink>

          <NavLink to="/membership" className="menuItem" onClick={closeSidebar}>
            <Ticket size={20} />
            <span>Membership Status</span>
          </NavLink>

          <NavLink to="/profile" className="menuItem" onClick={closeSidebar}>
            <User size={20} />
            <span>Profile Settings</span>
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <NavLink
          to="/"
          className="logoutBar"
          onClick={() => {
            closeSidebar();
            logout();
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </aside>
    </>
  );
}