import Navbar from "../navbar/nav";
import AthleteCard from "../../components/athletecard";
function AthleteProfile() {
    return (
        <>
            <div>
                <Navbar />
                <div className="mu-membership-wrapper">
                    <div className="EventReport">Profile </div>
                    <div className="athleteProfileCard">
                        <AthleteCard />
                    </div>

                </div>


            </div>
        </>
    );
}

export default AthleteProfile;