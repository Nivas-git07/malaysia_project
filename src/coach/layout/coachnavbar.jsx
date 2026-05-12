import { FiSearch, FiBell } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { notification_count } from "../../admin/api/notification_api";
import { get_check } from "../../user/api/home_api";
// import Settings from "../dashboard/Settings";
function CoachNavbar() {
  const navigate = useNavigate();
  const { data: profileData } = useQuery({
    queryKey: ["get_check"],
    queryFn: get_check,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = profileData?.data || [];
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
          <div
            className="bell"
            onClick={() => navigate("/athlete/notification")}
          >
            <FiBell size={20} color="#666" />
            <span className="bellDot">{countData?.data.count || 0} </span>
          </div>

          <img
            onClick={() => {
              navigate("/athlete/profile");
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

export default CoachNavbar;
