import Sidebar from "./sidebar";

function AdminLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}

export default AdminLayout;