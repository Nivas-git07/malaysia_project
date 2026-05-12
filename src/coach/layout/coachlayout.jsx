import CoachNavbar from "./coachnavbar";
import CoachSidebar from "./coachsidebar";
function CoachLayout({ children }) {
  return (
    <>
      {/* <AthleteNavbar /> */}
      <div className="layout">
        <CoachSidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </>
  );
}

export default CoachLayout;
