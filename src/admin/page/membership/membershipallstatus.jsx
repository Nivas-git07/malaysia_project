import Navbar from "../navbar/nav";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
function MembershipALLStatus() {
  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="ms-wrapper">
          <div className="ms-header">
            <div>
              <h1>My Memberships</h1>
              <p>View and manage all your purchased memberships</p>
            </div>

            <button className="ms-add-btn">+ Add New Membership</button>
          </div>

          <div className="ms-card ms-active">
            <div className="ms-bar"></div>

            <div className="ms-card-content">
              <div className="ms-info">
                <h2>Athlete Elite</h2>

                <div className="ms-grid">
                  <div>
                    <span>MEMBER ID</span>
                    <p>MFSA-2024-001</p>
                  </div>
                  <div>
                    <span>CLUB AFFILIATE</span>
                    <p>KL Dolphins</p>
                  </div>
                  <div>
                    <span>EXPIRY DATE</span>
                    <p>Dec 31, 2024</p>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <p className="ms-red">12 Days Left</p>
                  </div>
                </div>
              </div>

              <div className="ms-actions">
                <span className="ms-badge green">ACTIVE</span>
                <button className="ms-outline-btn">View Details</button>
                <button className="ms-primary-btn">Renew Now</button>
                <FaEllipsisV />
              </div>
            </div>
          </div>

          <div className="ms-card">
            <div className="ms-card-content">
              <div className="ms-info">
                <h2>Coach / Official</h2>

                <div className="ms-grid">
                  <div>
                    <span>MEMBER ID</span>
                    <p>MFSA-2024-042</p>
                  </div>
                  <div>
                    <span>CLUB AFFILIATE</span>
                    <p>Selangor Fins</p>
                  </div>
                  <div>
                    <span>EXPIRY DATE</span>
                    <p>Nov 25, 2024</p>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <p className="ms-red">5 Days Left</p>
                  </div>
                </div>
              </div>

              <div className="ms-actions">
                <span className="ms-badge orange">EXPIRING SOON</span>
                <button className="ms-outline-btn">View Details</button>
                <button className="ms-primary-btn small">Renew</button>
                <FaEllipsisV />
              </div>
            </div>
          </div>

          <div className="ms-card ms-disabled">
            <div className="ms-card-content">
              <div className="ms-info">
                <h2>Athlete Basic</h2>

                <div className="ms-grid">
                  <div>
                    <span>MEMBER ID</span>
                    <p>MFSA-2023-112</p>
                  </div>
                  <div>
                    <span>CLUB AFFILIATE</span>
                    <p>Penang aquatic</p>
                  </div>
                  <div>
                    <span>EXPIRY DATE</span>
                    <p>Oct 15, 2024</p>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <p>0 Days Left</p>
                  </div>
                </div>
              </div>

              <div className="ms-actions">
                <span className="ms-badge red">EXPIRED</span>
                <button className="ms-outline-btn disabled">
                  View Details
                </button>
                <button className="ms-disabled-btn">Purchase New</button>
                <FaEllipsisV />
              </div>
            </div>
          </div>

          <div className="ms-bottom">
            <div className="ms-benefits">
              <h3>
                Unlock your competitive edge with MFSA National Sanctioning
              </h3>

              <ul>
                <li>National ranking participation</li>
                <li>Insurance coverage for all sanctioned events</li>
                <li>Exclusive access to technical workshops</li>
              </ul>

              <button>View Full Rulebook</button>
            </div>

            {/* Right Help */}
            <div className="ms-help">
              <div className="ms-help-icon">?</div>
              <h4>Need Assistance?</h4>
              <p>
                Our support team is available 24/7 to help with your membership
                renewal or technical issues.
              </p>
              <span>Contact Support →</span>
            </div>
          </div>

          {/* Floating Button */}
          <div className="ms-float-btn">
            <FaPlus />
          </div>
        </div>
      </div>
    </>
  );
}

export default MembershipALLStatus;
