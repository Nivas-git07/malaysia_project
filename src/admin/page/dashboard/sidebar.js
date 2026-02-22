import React, { useState } from "react";
import '../../style/dashboard/sidebar.css'
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
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

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22}/>
      </div>

      <aside className={`sidebar ${open ? "show" : ""}`}>

        {/* LOGO AREA */}
        <div className="sidebarTop">
          <img src={logo} alt="logo"/>
        </div>

        {/* MENU */}
        <nav className="sidebarMenu">

          <NavLink to="/home" className="menuItem">
            <Home size={20}/>
            <span>Home</span>
          </NavLink>

          <NavLink to="/athlete" className="menuItem">
            <User size={20}/>
            <span>Athlete</span>
          </NavLink>

          <NavLink to="/calendar" className="menuItem">
            <Calendar size={20}/>
            <span>Calendar</span>
          </NavLink>

          <NavLink to="/tickets" className="menuItem">
            <Ticket size={20}/>
            <span>Tickets</span>
          </NavLink>

          <NavLink to="/report" className="menuItem">
            <BarChart2 size={20}/>
            <span>Report</span>
          </NavLink>

          <NavLink to="/news" className="menuItem">
            <Newspaper size={20}/>
            <span>News</span>
          </NavLink>

          <NavLink to="/settings" className="menuItem">
            <Settings size={20}/>
            <span>Settings</span>
          </NavLink>

        </nav>

        {/* LOGOUT */}
       <NavLink to="/admin" className="logoutBar">
           <LogOut size={18}/>
          <span>Logout</span>
        </NavLink>

      </aside>
    </>
  );
}
