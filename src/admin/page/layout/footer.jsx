import { useNavigate } from "react-router-dom";

export default function AdminFooter() {
  const navigate = useNavigate();

  return (
    <footer className="mfsaModuleFooter" aria-label="Admin footer">
      <div className="mfsaModuleFooterInner">
        <div className="mfsaModuleFooterBrand">Admin Panel</div>
        <ul className="mfsaModuleFooterLinks">
          <li onClick={() => navigate("/admin/home")}>Dashboard</li>
          <li onClick={() => navigate("/admin/athlete")}>Users</li>
          <li onClick={() => navigate("/admin/calendar")}>Events</li>
          <li onClick={() => navigate("/admin/news")}>News</li>
          <li onClick={() => navigate("/admin/settings")}>Settings</li>
        </ul>
      </div>
    </footer>
  );
}

