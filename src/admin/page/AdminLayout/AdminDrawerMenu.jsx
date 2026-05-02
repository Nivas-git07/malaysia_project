import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Calendar,
  Ticket,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { RiGroupFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import { BiCommentDetail } from "react-icons/bi";
import { TbCreditCardRefund } from "react-icons/tb";
import { logout } from "../../api/auth_api";
import "../../style/dashboard/sidebar.css";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../../auth/AuthContext";

export default function AdminDrawerMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout: logoutSession } = useAuth();

  const linkClassName = useMemo(
    () => ({ isActive }) => `menuItem${isActive ? " active" : ""}`,
    [],
  );

  if (!isOpen) {
    // Keep markup minimal when closed; backdrop still handles clicks via CSS.
    return null;
  }

  return (
    <>
      <div
        className={`mfsaSidebarBackdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
        role="presentation"
      />

      <aside className={`sidebar ${isOpen ? "show" : ""}`} aria-label="Admin drawer">
        <div className="sidebarTop">
          <div className="sidebarBanner">
            <img src={logo} alt="logo" className="sidebarLogo" />
          </div>
        </div>

        <nav className="sidebarMenu">
          <NavLink
            to="/admin/home"
            className={linkClassName}
            onClick={onClose}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/athlete"
            className={linkClassName}
            onClick={onClose}
          >
            <User size={20} />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/state-management"
            className={linkClassName}
            onClick={onClose}
          >
            <RiGroupFill size={20} />
            <span>State Management</span>
          </NavLink>

          <NavLink
            to="/admin/calendar"
            className={linkClassName}
            onClick={onClose}
          >
            <Calendar size={20} />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/admin/membershipapproval"
            className={linkClassName}
            onClick={onClose}
          >
            <FaAddressCard size={20} />
            <span>Membership Approval</span>
          </NavLink>

          <NavLink
            to="/admin/membership/status"
            className={linkClassName}
            onClick={onClose}
          >
            <TbCreditCardRefund size={20} />
            <span>Membership Status</span>
          </NavLink>

          <NavLink
            to="/admin/tickets"
            className={linkClassName}
            onClick={onClose}
          >
            <Ticket size={20} />
            <span>Tickets</span>
          </NavLink>

          <NavLink
            to="/admin/record"
            className={linkClassName}
            onClick={onClose}
          >
            <PiNotePencilBold size={20} />
            <span>Record Entry</span>
          </NavLink>

          <NavLink
            to="/admin/report"
            className={linkClassName}
            onClick={onClose}
          >
            <BarChart2 size={20} />
            <span>Report</span>
          </NavLink>

          <NavLink to="/admin/news" className={linkClassName} onClick={onClose}>
            <span style={{ width: 20, display: "inline-block" }} />
            <span>News</span>
          </NavLink>

          <NavLink
            to="/admin/gallery"
            className={linkClassName}
            onClick={onClose}
          >
            <GrGallery size={20} />
            <span>Gallery</span>
          </NavLink>

          <NavLink
            to="/admin/about"
            className={linkClassName}
            onClick={onClose}
          >
            <BiCommentDetail size={20} />
            <span>About</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={linkClassName}
            onClick={onClose}
          >
            <Settings size={20} />
            <span>Profile</span>
          </NavLink>

          <button
            type="button"
            className="logoutBar"
            onClick={async () => {
              onClose?.();
              try {
                await logout();
              } catch (error) {
                // Session cleanup must continue even if server logout fails
              }
              await logoutSession();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

