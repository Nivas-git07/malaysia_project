import Navbar from "../navbar/nav";


function MembersipRenew() {
  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
      
        <div className="mu-header">
          <h1>Membership</h1>
          <p>Manage and renew your membership</p>
        </div>

     
        <div className="mu-top-section">
          
          {/* Left Card */}
          <div className="mu-plan-card">
            <div className="mu-plan-header">
              <div>
                <span className="mu-label">CURRENT PLAN</span>
                <h2>Athlete Elite</h2>
              </div>
              <span className="mu-badge">Expiring Soon</span>
            </div>

            <div className="mu-days">
              <h1>12 <span>Days Left</span></h1>
              <p>Expires on Dec 31, 2024</p>
            </div>

            <div className="mu-progress">
              <div className="mu-progress-bar"></div>
            </div>

            <div className="mu-progress-info">
              <span>Validity Remaining</span>
              <span>60%</span>
            </div>
          </div>

          
          <div className="mu-urgent-card">
            <h3>Urgent Action</h3>
            <p>
              Your membership will expire soon. Renew now to avoid interruption
              in competition eligibility and member benefits.
            </p>
            <button className="mu-renew-btn">Renew Membership →</button>
          </div>
        </div>

       
        <div className="mu-credentials">
          <h3>Member Credentials</h3>

          <div className="mu-cred-grid">
            <div>
              <span>Club Affiliation</span>
              <p>KL Dolphins</p>
            </div>

            <div>
              <span>Association ID</span>
              <p>MFSA-ATH-8892</p>
            </div>

            <div>
              <span>Member Since</span>
              <p>Jan 10, 2024</p>
            </div>

            <div>
              <span>Current Status</span>
              <p className="mu-status">● Paid</p>
            </div>
          </div>
        </div>


        <div className="mu-bottom">
          <div>
            <h3>Renew your current plan or upgrade</h3>
            <p>
              Maintaining active membership is required for all MFSA sanctioned
              events and FINA-standard trials.
            </p>
          </div>

          <div className="mu-actions">
            <button className="mu-renew-btn big">Renew Membership</button>
            <button className="mu-leave-btn">Leave Membership</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MembersipRenew;