import Sidebar from "./sidebar";
import AdminMobileNavbar from "./AdminMobileNavbar";
import AdminDrawerMenu from "./AdminDrawerMenu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isDrawerOpen]);

  return (
    <div className="layout">
      <AdminMobileNavbar onOpenDrawer={() => setIsDrawerOpen(true)} />

      <div className="adminSidebarDesktop" aria-hidden={isDrawerOpen}>
        <Sidebar />
      </div>

      <main className="content">
        <AdminDrawerMenu
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;