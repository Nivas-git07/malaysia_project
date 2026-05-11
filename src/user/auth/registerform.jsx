import { useState } from "react";
import ClubRegisterFlow from "./form/clubregisterform";
import AthleteRegisterFlow from "./form/athleteregisterflow";
// import CoachRegisterFlow from "./form/coachregisterflow";

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState("individual");

  // Club flow step
  const [clubStep, setClubStep] = useState(1);

  // Athlete flow step
  const [athleteStep, setAthleteStep] = useState(1);

  // Coach flow step
  const [coachStep, setCoachStep] = useState(1);

  // Full width logic
  const isFullWidth =
    (activeTab === "clubFlow" && clubStep >= 3) ||
    (activeTab === "individual" && athleteStep >= 2) ||
    (activeTab === "coach" && coachStep >= 2);

  return (
    <section className="regSection">
      {!isFullWidth && (
        <div className="regContainer">
          {activeTab !== "clubFlow" && (
            <>
              <h2 className="regTitle">REGISTRATION</h2>

              <div className="regTabs">
                {/* CLUB */}
                <button
                  className={`regTab ${
                    activeTab === "state" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("state");
                    setClubStep(1);
                  }}
                >
                  Club
                </button>

                {/* ATHLETE */}
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

                {/* COACH */}
                <button
                  className={`regTab ${
                    activeTab === "coach" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("coach");
                    setCoachStep(1);
                  }}
                >
                  Coach
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className={isFullWidth ? "fullWidthContainer" : "regContainer"}>
        {/* CLUB FLOW */}
        {(activeTab === "state" || activeTab === "clubFlow") && (
          <ClubRegisterFlow
            onStepChange={setActiveTab}
            step={clubStep}
            setStep={setClubStep}
          />
        )}

        {/* ATHLETE FLOW */}
        {activeTab === "individual" && (
          <AthleteRegisterFlow
            step={athleteStep}
            setStep={setAthleteStep}
            onStepChange={setActiveTab}
          />
        )}

        {/* COACH FLOW */}
        {activeTab === "coach" && (
          // <CoachRegisterFlow
          //   step={coachStep}
          //   setStep={setCoachStep}
          //   onStepChange={setActiveTab}
          // />
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