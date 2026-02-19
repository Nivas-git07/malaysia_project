import { useState } from "react";
import Atheleform from "./form/atheleform";
import ClubForm from "./form/clubform";
export default function RegistrationForm() {

    const [activeTab, setActiveTab] = useState("individual");

    return (
        <section className="regSection">
            <div className="regContainer">

                <h2 className="regTitle">REGISTRATION</h2>

              
                <div className="regTabs">
                    <button
                        className={`regTab ${activeTab === "state" ? "active" : ""}`}
                        onClick={() => setActiveTab("state")}
                    >
                        State / Club
                    </button>

                    <button
                        className={`regTab ${activeTab === "individual" ? "active" : ""}`}
                        onClick={() => setActiveTab("individual")}
                    >
                        Individual Athlete
                    </button>
                </div>

               {activeTab==="state" ? <ClubForm/> : <Atheleform/>}

            </div>
        </section>
    );
}
