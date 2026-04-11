import { useState } from "react";
import ClubRegisterFlow from "./form/clubregisterform";
import Atheleform from "./form/atheleform";
export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState("individual");
  const [flowStep, setFlowStep] = useState(1);

  const isFullWidth = flowStep >= 3;

  return (
    <section className="regSection">

   
      {!isFullWidth && (
        <div className="regContainer">
          {activeTab !== "clubFlow" && (
            <>
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
            </>
          )}
        </div>
      )}

    
      <div className={isFullWidth ? "fullWidthContainer" : "regContainer"}>
        {(activeTab === "state" || activeTab === "clubFlow") && (
          <ClubRegisterFlow
            onStepChange={setActiveTab}
            step={flowStep}
            setStep={setFlowStep}
          />
        )}
        {activeTab === "individual" && <Atheleform />}
      </div>

    </section>
  );
}