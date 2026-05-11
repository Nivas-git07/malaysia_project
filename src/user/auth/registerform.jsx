import { useState } from "react";
import ClubRegisterFlow from "./form/clubregisterform";
import AthleteRegisterFlow from "./form/athleteregisterflow";
import CoachForm from "./form/coachform";

import { coach_register } from "../api/auth";

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState("individual");

  const [clubStep, setClubStep] = useState(1);
  const [athleteStep, setAthleteStep] = useState(1);

  // =========================
  // COACH REGISTER API
  // =========================
  const handleCoachSubmit = async (data) => {
    try {
      const response = await coach_register(
        data.full_name,
        data.state,
        data.email_id,
        data.password,
        data.expert_discipline
      );

      console.log(response.data);

      alert("Coach Registered Successfully ✅");
    } catch (e) {
      console.log(e.response?.data);

      alert("Coach Registration Failed ❌");
    }
  };

  const isFullWidth =
    (activeTab === "clubFlow" && clubStep >= 3) ||
    (activeTab === "individual" && athleteStep >= 2);

  return (
    <section className="regSection">
      {!isFullWidth && (
        <div className="regContainer">
          {activeTab !== "clubFlow" && (
            <>
              <h2 className="regTitle">
                REGISTRATION
              </h2>

              <div className="regTabs">
                {/* CLUB */}
                <button
                  className={`regTab ${
                    activeTab === "state"
                      ? "active"
                      : ""
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
                    activeTab === "individual"
                      ? "active"
                      : ""
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
                    activeTab === "coach"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveTab("coach");
                  }}
                >
                  Coach
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div
        className={
          isFullWidth
            ? "fullWidthContainer"
            : "regContainer"
        }
      >
        {/* CLUB */}
        {(activeTab === "state" ||
          activeTab === "clubFlow") && (
          <ClubRegisterFlow
            onStepChange={setActiveTab}
            step={clubStep}
            setStep={setClubStep}
          />
        )}

        {/* ATHLETE */}
        {activeTab === "individual" && (
          <AthleteRegisterFlow
            step={athleteStep}
            setStep={setAthleteStep}
            onStepChange={setActiveTab}
          />
        )}

        {/* COACH */}
        {activeTab === "coach" && (
          <CoachForm
            onSubmit={handleCoachSubmit}
          />
        )}
      </div>
    </section>
  );
}