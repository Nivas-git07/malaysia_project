import { FiSearch, FiBell } from "react-icons/fi";
import "../../style/Settings.css";
import { useNavigate } from "react-router-dom";
function Navbar() 
{
  const navigate = useNavigate();
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
    <div className="bell" onClick={() => navigate("/admin/notification")}>
      <FiBell size={20} color="#666"/>
      <span className="bellDot"></span>
    </div>

    <img
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