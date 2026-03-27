export default function ClubFormX() {
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
            <textarea placeholder="Describe your club, history, and activities..." />
          </div>

          <div className="mfsaFormGroupX">
            <label>VISION</label>
            <textarea placeholder="What is your club’s long-term vision?" />
          </div>

          <div className="mfsaFormGroupX">
            <label>MISSION</label>
            <textarea placeholder="What are your goals and mission?" />
          </div>

          <div className="mfsaFormBtnWrapX">
            <button className="mfsaFormBtnX">Save & Continue</button>
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
