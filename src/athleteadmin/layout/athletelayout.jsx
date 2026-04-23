import AthleteSidebar from "./athletesidebar";
import AthleteNavbar from "./athletenavbar";
function AthleteLayout({ children }) {
  return (
    <>
      <AthleteNavbar />
      <div className="layout">
        <AthleteSidebar />
        <main className="content">{children}</main>
      </div>
    </>
  );
}

export default AthleteLayout;
