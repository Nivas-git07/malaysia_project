import React from "react";
import "../../style/AdminLogin.css";
import logo from "../../assets/logo.jpg";
import bg from "../../assets/background.png";
import { FaRegEye } from "react-icons/fa"; 

export default function AdminLogin() {
  return (
    <div className="adminWrapper">
      <div className="bgLayer" style={{ backgroundImage: `url(${bg})` }}></div>
      
      {/* Top Left Navigation Link */}
      <div className="backNav">
        <a href="/">← Back to main site</a>
      </div>

      <div className="adminCenter">
        <div className="adminBox">
          <div className="logoWrapper">
            <img src={logo} alt="MFSA Logo" />
          </div>

          <h1 className="adminTitle">ADMIN LOGIN</h1>

          <div className="formSection">
            <div className="formGroup">
              <label>Email</label>
              <input type="email" placeholder="e.g.,example@email.com" />
            </div>

            <div className="formGroup">
              <label>Password</label>
              <div className="passwordInputWrapper">
                <input type="password" />
                <FaRegEye className="eyeIcon" />
              </div>
            </div>
          </div>

          <button className="loginBtn">Login</button>
        </div>
      </div>

      <div className="footer">
        © 2025 Malaysia fin Swimming Association. All Rights Reserved.
      </div>
    </div>
  );
}