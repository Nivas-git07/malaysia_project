import a1 from "../../assets/image.png";

import { GiTrophyCup } from "react-icons/gi";

export default function AthleteProfile({ athlete, records }) {
  return (
    <section className="athProfileSection">
      <div className="athProfileContainer">
        <div className="athProfileLeft">
          <div className="athProfileImgWrap">
            <img src={athlete?.profile_picture} alt="athlete" />
          </div>
        </div>

        <div className="athProfileRight">
          <div className="athProfileNameBar">{athlete?.full_name}</div>

          <div className="athProfileInfoGrid">
            <div>
              <p className="athLabel">Date Of Birth</p>
              <p className="athValue">{athlete?.date_of_birth}</p>
            </div>

            <div>
              <p className="athLabel">State</p>
              <p className="athValue">{athlete?.state_name}</p>
            </div>

            <div>
              <p className="athLabel">Discipline</p>
              <p className="athValue">{records?.primary_discipline}</p>
            </div>
          </div>

          <div className="athMedalRow">
            <div className="athMedalMain">
              <GiTrophyCup />
              {records?.total_medals} medal
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> {records?.total_gold} Gold
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> {records?.total_silver} Silver
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> {records?.total_bronze} Bronze
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
