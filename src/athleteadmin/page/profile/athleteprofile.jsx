import AthleteNavbar from "../../layout/athletenavbar";
import AthleteProfileComponent from "../../components/profilecomponent/profilesettingcomponent";

function AthleteProfile() {
  return (
    <div>
      <AthleteNavbar />
      <div className="mu-membership-wrapper">
        <AthleteProfileComponent />
     
      </div>
    </div>
  );
}

export default AthleteProfile;
