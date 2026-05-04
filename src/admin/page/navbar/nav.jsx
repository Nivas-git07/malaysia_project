import { FiSearch, FiBell } from "react-icons/fi";
import "../../style/Settings.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { notification_count } from "../../api/notification_api";
import Settings from "../dashboard/Settings";
import { get_permission } from "../../api/auth_api";
import { get_check } from "../../../user/api/home_api";
import { useAuth } from "../../../auth/AuthContext";
function Navbar() {
  const navigate = useNavigate();
  const {
    data: permission
  } = useQuery({
    queryKey: ["getpermission"],
    queryFn: get_permission,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const permissons = permission?.data || [];
  const { logout: logoutSession, role } = useAuth();
  const STAFF_ROLES = ["NATIONAL_STAFF", "STATE_STAFF", "CLUB_STAFF"];

  const isStaff = STAFF_ROLES.includes(role);

  if (isStaff) {
    return null;
  }

  const {
    data: countData,
    isLoading: countLoading,
    error: countError,
  } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: notification_count,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const { data: profileData } = useQuery({
    queryKey: ["get_check"],
    queryFn: get_check,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = profileData?.data || [];
  console.log(
    "Notification Count Data:",
    countData?.data,
    countLoading,
    countError,
  );
  return (
    <div className="pageWrapper">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="navSearchWrapper">
          <input
            type="text"
            placeholder="Search..."
            className="navSearchInput"
          />
          <FiSearch className="searchIcon" />
        </div>

        <div className="navRight">
          <div className="bell" onClick={() => navigate("/admin/notification")}>
            <FiBell size={20} color="#666" />
            <span className="bellDot">{countData?.data.count || 0} </span>
          </div>

          <img
            onClick={() => {
              navigate("/admin/settings");
            }}
            className="navAvatar"
            src={
              user?.profile_picture
                ? user.profile_picture
                : "https://i.pravatar.cc/80"
            }
            alt="profile"
          />
        </div>
      </div>

      {/* PERSONAL INFORMATION TITLE */}
    </div>
  );
}

export default Navbar;
