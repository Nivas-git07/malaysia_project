import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauth-container">
      <div className="unauth-content">
        <div className="wave"></div>

        <h1 className="unauth-code">403</h1>
        <h2 className="unauth-title">Unauthorized Access</h2>

        <p className="unauth-desc">
          Oops! You don’t have permission to view this page.
          <br />
          Please login or return to the homepage.
        </p>

        <div className="unauth-actions">
          <button className="btns-primarys" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
