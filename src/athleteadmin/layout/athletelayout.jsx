import AthleteSidebar from "../components/sidebarcomponent";

function AthleteLayout({ children }) {
  return (
    <div className="layout">
      <AthleteSidebar />
      <main className="content">{children}</main>
    </div>
  );
}

export default AthleteLayout;