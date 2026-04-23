import AthleteNavbar from "../../layout/athletenavbar";
import AthleteDashboard from "../../components/athletehome/dashboard";
import RecentEvents from "../../components/athletehome/recentevent";
function AthleteHome() {
  return (
    <>
      <AthleteNavbar />
      <div className="mu-membership-wrapper">
        <AthleteDashboard />
        {/* <RecentEvents /> */}

      </div>
    </>
  );
}

export default AthleteHome;
