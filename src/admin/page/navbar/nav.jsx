import { FiSearch, FiBell } from "react-icons/fi";
import "../../style/Settings.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { notification_count } from "../../api/notification_api";
import Settings from "../dashboard/Settings";
function Navbar() 
{

  const navigate = useNavigate();
    const { data: countData, isLoading: countLoading, error: countError } = useQuery({
        queryKey: ["notificationCount"],
        queryFn: notification_count,
        refetchOnWindowFocus: false,
        retry: false,
    });
    console.log("Notification Count Data:", countData?.data, countLoading, countError);
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
    <FiSearch className="searchIcon"/>
  </div>

  <div className="navRight">
    <div className="bell" onClick={() => navigate("/notification")}>
      <FiBell size={20} color="#666"/>
      <span className="bellDot">{countData?.data.count || 0} </span>
    </div>

    <img onClick={()=>{navigate("/admin/settings")}}
      className="navAvatar"
      src="https://i.pravatar.cc/80"
      alt="profile"
    />
  </div>

</div>

      {/* PERSONAL INFORMATION TITLE */}
     

    </div>  
   
  );
}

export default Navbar;