import React, { useState } from "react";
import "../../style/dashboard/sidebar.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { RiGroupFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { logout } from "../../api/auth_api";
import { PiNotePencilBold } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import { BiCommentDetail } from "react-icons/bi";
import { TbCreditCardRefund } from "react-icons/tb";
import { get_check } from "../../../user/api/home_api";
import {
  Home,
  User,
  Calendar,
  Ticket,
  BarChart2,
  Newspaper,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../auth/AuthContext";
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { logout: logoutSession, session } = useAuth();

  const closeSidebar = () => {
    setOpen(false);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["checkSession", session?.userId, session?.role],
    queryFn: get_check,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const checkdata = data?.data.role;

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22} />
      </div>

      <div
        className={`mfsaSidebarBackdrop ${open ? "open" : ""}`}
        onClick={closeSidebar}
      />

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

          <NavLink
            to="/admin/athlete"
            className="menuItem"
            onClick={closeSidebar}
          >
            <User size={20} />
            <span>Athlete</span>
          </NavLink>
          {checkdata === "SUPERADMIN" && (
            <NavLink
              to="/admin/state-management"
              className="menuItem"
              onClick={closeSidebar}
            >
              <RiGroupFill size={20} />
              <span>State Management</span>
            </NavLink>
          )}
          <NavLink
            to="/admin/calendar"
            className="menuItem"
            onClick={closeSidebar}
          >
            <Calendar size={20} />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/admin/membershipapproval"
            className="menuItem"
            onClick={closeSidebar}
          >
            <FaAddressCard size={20} />
            <span>membership Approval</span>
          </NavLink>
          {checkdata !== "SUPERADMIN" && (
            <NavLink
              to="/admin/membership/status"
              className="menuItem"
              onClick={closeSidebar}
            >
              <TbCreditCardRefund size={20} />
              <span>membership Status</span>
            </NavLink>
          )}
          {checkdata === "SUPERADMIN" && (
            <NavLink
              to="/admin/tickets"
              className="menuItem"
              onClick={closeSidebar}
            >
              <Ticket size={20} />
              <span>Tickets</span>
            </NavLink>
          )}

          <NavLink
            to="/admin/record"
            className="menuItem"
            onClick={closeSidebar}
          >
            <PiNotePencilBold size={20} />
            <span>Record Entry</span>
          </NavLink>

          <NavLink
            to="/admin/report"
            className="menuItem"
            onClick={closeSidebar}
          >
            <BarChart2 size={20} />
            <span>Report</span>
          </NavLink>

          <NavLink to="/admin/news" className="menuItem" onClick={closeSidebar}>
            <Newspaper size={20} />
            <span>News</span>
          </NavLink>

          <NavLink
            to="/admin/gallery"
            className="menuItem"
            onClick={closeSidebar}
          >
            <GrGallery size={20} />
            <span>Gallery</span>
          </NavLink>

          <NavLink
            to="/admin/about"
            className="menuItem"
            onClick={closeSidebar}
          >
            <BiCommentDetail size={20} />
            <span>About</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className="menuItem"
            onClick={closeSidebar}
          >
            <FaUserCircle size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>

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
