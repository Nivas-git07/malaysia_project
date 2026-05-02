import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login_user } from "../../../user/api/auth";
import { useAuth } from "../../../auth/AuthContext";

export default function MemberLogin() {
  const { loginWithPayload, isAuthenticated, isLoading, role } = useAuth();
  const navigate = useNavigate();

  const getRedirectPath = (userRole) =>
    userRole === "ATHLETE" ? "/athlete/dashboard" : "/admin/home";

  const [formdata, setFormdata] = useState({
    email: "",
    // govt_id: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!formdata.email || !formdata.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await login_user(undefined, formdata.email, formdata.password);

      console.log("Login successful:", response.data);
      await loginWithPayload(response.data);

      const userRole = response.data?.role ?? response.data?.data?.role ?? role;
      navigate(getRedirectPath(userRole), { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
            error.response.data?.error ||
            "Invalid email or password",
        );
      } else if (error.request) {
        setError("Server not responding. Please try again.");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) {
    return <section className="loginSection">Checking session...</section>;
  }
  if (isAuthenticated) {
    const to = role === "ATHLETE" ? "/athlete/dashboard" : "/admin/home";
    return <Navigate to={to} replace />;
  }

  return (
    <section className="loginSection">
      <div className="loginContainer">
        <h2 className="loginTitle">MEMBER LOGIN</h2>
        <p className="loginSub">
          Access your athlete dashboard and performance metrics
        </p>

        <form className="loginForm" onSubmit={handleLogin}>
          {/* <div className="loginField">
            <label>Govt ID</label>
            <input
              type="text"
              name="govt_id"
              value={formdata.govt_id}
              onChange={handlechange}
              placeholder="Enter your govt-id"
            />
          </div> */}

          <div className="loginField">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder="name@example.com"
            />
          </div>

          <div className="loginField">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="loginError">{error}</p>}

          <div className="loginBtnWrap">
            <button className="loginBtn" disabled={loading}>
              {loading ? "Logging in..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
