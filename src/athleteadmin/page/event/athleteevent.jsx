import AthleteNavbar from "../../layout/athletenavbar"
import MyEvents from "../../components/eventcomponent/myevent"
function AthleteEvent(){
    return(
        <>
        <AthleteNavbar />
        <div className="mu-membership-wrapper">
           <MyEvents />
        </div>
        </>
    )
}

export default AthleteEvent;