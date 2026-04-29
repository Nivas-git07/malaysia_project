import { useNavigate } from "react-router-dom";

export default function AthleteAdminFooter() {
  const navigate = useNavigate();

  return (
    <footer className="mfsaModuleFooter" aria-label="Athlete admin footer">
      <div className="mfsaModuleFooterInner">
        <div className="mfsaModuleFooterBrand">MFSA — Athlete Admin</div>
        <ul className="mfsaModuleFooterLinks">
          <li onClick={() => navigate("/athlete/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/athlete/events")}>Events</li>
          <li onClick={() => navigate("/athlete/membership/status")}>Membership</li>
          <li onClick={() => navigate("/athlete/profile")}>Profile</li>
        </ul>
      </div>
    </footer>
  );
}

