import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../style/dashboard/sidebar.css";
import logo from "../../assets/logo.jpg";
import { Menu, LogOut } from "lucide-react";

import { PiNotePencilBold } from "react-icons/pi";
import { RiGroupFill } from "react-icons/ri";
import { Newspaper, Calendar } from "lucide-react";
import { GrGallery } from "react-icons/gr";
import { FaAddressCard } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

import { get_permission, logout } from "../../api/auth_api";
import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "../../../auth/AuthContext";

export default function StaffSidebar() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["check_permission"],
    queryFn: get_permission,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const permissions = data?.data || {}; // ✅ FIXED
  console.log("permissions", permissions);

  const closeSidebar = () => setOpen(false);

  // 🔥 Permission → Menu Mapping
  const PERMISSION_MENU = {
    arc: {
      name: "Record Entry",
      path: "/admin/record",
      icon: <PiNotePencilBold size={20} />,
    },
    tm: {
      name: "Ticket",
      path: "/admin/tickets",
      icon: <RiGroupFill size={20} />,
    },
    nc: {
      name: "News",
      path: "/admin/news",
      icon: <Newspaper size={20} />,
    },
    ec: {
      name: "Events",
      path: "/admin/calendar",
      icon: <Calendar size={20} />,
    },
    gc: {
      name: "Gallery",
      path: "/admin/gallery",
      icon: <GrGallery size={20} />,
    },
    ma: {
      name: "Membership Approval",
      path: "/admin/membershipapproval",
      icon: <FaAddressCard size={20} />,
    },
    cu: {
      name: "Content Management",
      path: "/admin/support",
      icon: <MdSupportAgent size={20} />,
    },
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="mobileToggle" onClick={() => setOpen(!open)}>
        <Menu size={22} />
      </div>

      <div
        className={`mfsaSidebarBackdrop ${open ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`sidebar ${open ? "show" : ""}`}>
        {/* Logo */}
        <div className="sidebarTop">
          <div className="sidebarBanner">
            <img src={logo} alt="logo" className="sidebarLogo" />
          </div>
        </div>

        {/* 🔥 Dynamic Menu */}
        <nav className="sidebarMenu">
          {isLoading ? (
            <p style={{ padding: "10px" }}>Loading...</p>
          ) : (
            Object.keys(PERMISSION_MENU).map((key) => {
              // ✅ handle both boolean & string "true"
              const isAllowed =
                permissions[key] === true ||
                permissions[key] === "true" ||
                permissions[key] === "True";

              if (!isAllowed) return null;

              const item = PERMISSION_MENU[key];

              return (
                <NavLink
                  key={key}
                  to={item.path}
                  className="menuItem"
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              );
            })
          )}
        </nav>

        {/* Logout */}
        <NavLink
          to="/"
          className="logoutBar"
          onClick={async () => {
            closeSidebar();
            try {
              await logout();
            } catch (e) {}
            // await logoutSession();
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </NavLink>
      </aside>
    </>
  );
}
