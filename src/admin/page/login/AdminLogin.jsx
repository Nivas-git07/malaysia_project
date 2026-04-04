import React from "react";
import "../../style/AdminLogin.css";
import logo from "../../assets/logo.jpg";
import bg from "../../assets/background.png";
import { FaRegEye } from "react-icons/fa";
import { adminLogin } from "../../api/auth_api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authenticate from "../authenticate/authenticate";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await adminLogin(email, password);
      console.log("Login successful:", response.data);
      navigate("/admin/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="adminWrapper">
      <div className="bgLayer" style={{ backgroundImage: `url(${bg})` }}></div>

      {/* Top Left Navigation Link */}
      <div className="backNav">
        <a href="/user">← Back to main site</a>
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
              <input type="email" placeholder="e.g.,example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="formGroup">
              <label>Password</label>
              <div className="passwordInputWrapper">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaRegEye className="eyeIcon" />
              </div>
            </div>
          </div>

          <button className="loginBtn" onClick={handleLogin}>Login</button>
        </div>
      </div>

      <div className="footer">
        © 2025 Malaysia fin Swimming Association. All Rights Reserved.
      </div>
    </div>
  );
}