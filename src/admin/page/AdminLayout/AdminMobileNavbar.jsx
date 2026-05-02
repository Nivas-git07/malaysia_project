import { Menu, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminMobileNavbar({ onOpenDrawer }) {
  const navigate = useNavigate();

  return (
    <div className="adminMobileTopbar">
      <button
        type="button"
        className="adminMobileMenuBtn"
        aria-label="Open admin menu"
        onClick={onOpenDrawer}
      >
        <Menu size={22} />
      </button>

      <div className="adminMobileTopbarTitle">Admin Panel</div>

      <button
        type="button"
        className="adminMobileProfileBtn"
        aria-label="Go to profile settings"
        onClick={() => navigate("/admin/settings")}
      >
        <UserCircle2 size={22} />
      </button>
    </div>
  );
}

