import { useState } from "react";
import ClubRegisterFlow from "./form/clubregisterform";
import AthleteRegisterFlow from "./form/athleteregisterflow";

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState("individual");

  // ✅ Separate steps (BEST PRACTICE)
  const [clubStep, setClubStep] = useState(1);
  const [athleteStep, setAthleteStep] = useState(1);

  // ✅ Full width logic (separate per flow)
  const isFullWidth =
    (activeTab === "clubFlow" && clubStep >= 3) ||
    (activeTab === "individual" && athleteStep >= 2);

  return (
    <section className="regSection">
   
      {!isFullWidth && (
        <div className="regContainer">
          {activeTab !== "clubFlow" && (
            <>
              <h2 className="regTitle">REGISTRATION</h2>

              <div className="regTabs">
              
                <button
                  className={`regTab ${
                    activeTab === "state" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("state");
                    setClubStep(1); 
                  }}
                >
                  State / Club
                </button>

                
                <button
                  className={`regTab ${
                    activeTab === "individual" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("individual");
                    setAthleteStep(1); 
                  }}
                >
                  Individual Athlete
                </button>
              </div>
            </>
          )}
        </div>
      )}

   
      <div className={isFullWidth ? "fullWidthContainer" : "regContainer"}>
        
      
        {(activeTab === "state" || activeTab === "clubFlow") && (
          <ClubRegisterFlow
            onStepChange={setActiveTab}
            step={clubStep}
            setStep={setClubStep}
          />
        )}

     
        {activeTab === "individual" && (
          <AthleteRegisterFlow
            step={athleteStep}
            setStep={setAthleteStep}
            onStepChange={setActiveTab} 
          />
        )}
      </div>
    </section>
  );
}