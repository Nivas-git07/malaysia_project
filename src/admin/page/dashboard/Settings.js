import React from 'react'
import { FiSearch, FiBell, FiEdit2 } from "react-icons/fi";
import "../../style/Settings.css";

function Settings() {
  return (
       <div className="pageWrapper">
   
         {/* NAVBAR */}
         <div className="navbar">
   
           {/* SEARCH BAR */}
           <div className="navSearchWrapper">
             <input type="text" className="navSearchInput" />
             <FiSearch className="searchIcon" />
           </div>
   
           <div className="navRight">
             <div className="bell">
               <FiBell size={20} color="#666" />
               <span className="bellDot"></span>
             </div>
   
             <img
               className="navAvatar"
               src="https://i.pravatar.cc/80"
               alt=""
             />
           </div>
   
         </div>
   
         {/* PERSONAL INFORMATION TITLE */}
         <div className="personalTitle">
           PERSONAL INFORMATION
         </div>
   
         {/* MAIN CARD */}
         <div className="profileContainer">
   
           <div className="avatarBox">
             <img src="https://i.pravatar.cc/100" alt="" />
             <span className="editIcon">
               <FiEdit2 size={12} />
             </span>
           </div>
   
           <div className="formGrid">
   
             <div className="formGroup">
               <label>First Name</label>
               <input value="Jane Cooper" readOnly />
             </div>
   
             <div className="formGroup">
               <label>Last Name</label>
               <input value="Wade Warren" readOnly />
             </div>
   
             <div className="formGroup">
               <label>Email</label>
               <input value="michelle.rivera@example.com" readOnly />
             </div>
   
             <div className="formGroup">
               <label>Phone number</label>
               <input value="252.555.0126" readOnly />
             </div>
   
             <div className="formGroup">
               <label>Date of Birth</label>
               <input value="02 / 29 / 2002" readOnly />
             </div>
   
             <div className="formGroup">
               <label>State</label>
               <select>
                 <option>Malaysia</option>
               </select>
             </div>
   
           </div>
   
           <div className="buttonRow">
             <button className="discardBtn">Discard Changes</button>
             <button className="saveBtn">Save changes</button>
           </div>
   
         </div>
       </div>
    
  )
}

export default Settings