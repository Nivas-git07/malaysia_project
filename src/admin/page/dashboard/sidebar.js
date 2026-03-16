import React, { useState } from "react";
import '../../style/dashboard/sidebar.css'
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { RiGroupFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { logout } from "../../api/auth_api";
import { PiNotePencilBold } from "react-icons/pi";
import {
  Home,
  User,
  Calendar,
  Ticket,
  BarChart2,
  Newspaper,
  Settings,
  LogOut,
  Menu
} from "lucide-react";

export default function Sidebar() {



  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22} />
      </div>

      <aside className={`sidebar ${open ? "show" : ""}`}>

        <div className="sidebarTop">
          <div className="sidebarBanner">
            <img src={logo} alt="logo" className="sidebarLogo" />
          </div>
        </div>

        <nav className="sidebarMenu">

          <NavLink to="/admin/home" className="menuItem" onClick={closeSidebar}>
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/admin/athlete" className="menuItem" onClick={closeSidebar}>
            <User size={20} />
            <span>Athlete</span>
          </NavLink>

          <NavLink to="/admin/calendar" className="menuItem" onClick={closeSidebar}>
            <Calendar size={20} />
            <span>Events</span>
          </NavLink>

          <NavLink to="/admin/user" className="menuItem" onClick={closeSidebar}>
            <FaAddressCard size={20} />
            <span>membership</span>
          </NavLink>

          <NavLink to="/admin/tickets" className="menuItem" onClick={closeSidebar}>
            <Ticket size={20} />
            <span>Tickets</span>
          </NavLink>

          <NavLink to="/admin/record" className="menuItem" onClick={closeSidebar}>
            <PiNotePencilBold size={20} />
            <span>Record Entry</span>
          </NavLink>

          <NavLink to="/admin/report" className="menuItem" onClick={closeSidebar}>
            <BarChart2 size={20} />
            <span>Report</span>
          </NavLink>

          <NavLink to="/admin/news" className="menuItem" onClick={closeSidebar}>
            <Newspaper size={20} />
            <span>News</span>
          </NavLink>

          <NavLink to="/admin/settings" className="menuItem" onClick={closeSidebar}>
            <FaUserCircle size={20} />
            <span>Profile</span>
          </NavLink>

        </nav>

        <NavLink to="/" className="logoutBar" onClick={() => {
          closeSidebar();
          logout();
        }}>
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>

      </aside>
    </>
  );
}