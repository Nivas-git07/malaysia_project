
import a1 from "../../assets/image.png";

import { GiTrophyCup } from "react-icons/gi";

export default function AthleteProfile() {
  return (
    <section className="athProfileSection">

      <div className="athProfileContainer">

       
        <div className="athProfileLeft">
          <div className="athProfileImgWrap">
            <img src={a1} alt="athlete" />
          </div>
        </div>

       
        <div className="athProfileRight">

        
          <div className="athProfileNameBar">
           Cameron Williamson
          </div>

          
          <div className="athProfileInfoGrid">

            <div>
              <p className="athLabel">Date Of Birth</p>
              <p className="athValue">09/05/2000</p>
            </div>

            <div>
              <p className="athLabel">Country</p>
              <p className="athValue">Sweden</p>
            </div>

            <div>
              <p className="athLabel">Discipline</p>
              <p className="athValue">500m, Bi-fins</p>
            </div>

          </div>

          
          <div className="athMedalRow">

            <div className="athMedalMain">
              <GiTrophyCup />
              12 Metals
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> 1 Gold
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> 5 Silver
            </div>

            <div className="athMedalItem">
              <GiTrophyCup /> 6 Bronze
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
