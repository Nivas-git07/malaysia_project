import CoachNavbar from "../../layout/coachnavbar";
import CoachProfileSettings from "../../component/coachprofilecomponent/profilecomponent";
export const Coachprofile = () => {
  return (
    <>
      <CoachNavbar />
      <div className="mu-membership-wrapper">
        <CoachProfileSettings />
      </div>
    </>
  );
};
