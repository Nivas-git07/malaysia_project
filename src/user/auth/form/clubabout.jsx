import { useState } from "react";

export default function ClubFormX({ onSubmit }) {
  const [extraData, setExtraData] = useState({
    about: "",
    vision: "",
    mission: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(extraData);
};
  return (
    <section className="mfsaClubFormX-section">
      <div className="mfsaClubFormX-wrapper">
        <div className="mfsaClubFormX-header">
          <h1>Tell Us About Your Club</h1>
          <p>Help us understand your club better</p>
        </div>

        <div className="mfsaClubFormX-card">
          <div className="mfsaFormGroupX">
            <label>ABOUT YOUR CLUB</label>
            <textarea placeholder="Describe your club, history, and activities..." onChange={handleChange} name="about"/>
          </div>

          <div className="mfsaFormGroupX">
            <label>VISION</label>
            <textarea placeholder="What is your club’s long-term vision?" onChange={handleChange} name="vision"/>
          </div>

          <div className="mfsaFormGroupX">
            <label>MISSION</label>
            <textarea placeholder="What are your goals and mission?" onChange={handleChange} name="mission"/>
          </div>

          <div className="mfsaFormBtnWrapX">
            <button className="mfsaFormBtnX" onClick={handleSubmit}>
              Save & Continue
            </button>
            {/* <span className="mfsaSkipX">Skip for now →</span> */}
          </div>
        </div>

        <p className="mfsaFormFooterX">
          © OFFICIAL MALAYSIA FINSWIMMING ASSOCIATION PORTAL
        </p>
      </div>
    </section>
  );
}
