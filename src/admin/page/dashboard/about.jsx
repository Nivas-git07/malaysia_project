import Navbar from "../navbar/nav";
import { FiX, FiPlus } from "react-icons/fi";
import Preview from "../hook/preview/preview";
export default function About() {
  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">

        <div className="mfsaAboutAdminX-container">

      
          <div className="mfsaAboutAdminX-header">
            <h2>Edit About Content</h2>
            <p>
              Modify your about, vision, and mission details to keep members updated.
            </p>
          </div>

          <div className="mfsaAboutAdminX-card">

        
            <div className="mfsaAboutAdminX-group">
              <label>About MFSA</label>
              <textarea placeholder="Enter detailed information about the association..." />
              <span className="mfsaAboutAdminX-hint">
                This section appears at the top of the public about page.
              </span>
            </div>

          
            <div className="mfsaAboutAdminX-group">
              <label>Our Vision</label>
              <textarea placeholder="Our vision is to become the leading authority..." />
            </div>

     
            <div className="mfsaAboutAdminX-group">

              <div className="mfsaAboutAdminX-missionHeader">
                <label>Our Mission Points</label>
                <span>4 Points Listed</span>
              </div>

              <div className="mfsaAboutAdminX-missionList">
                {[
                  "Promoting finswimming excellence across Malaysia through structured training.",
                  "Establishing world-class competition standards for national events.",
                  "Supporting athletes with scholarships and high-performance equipment.",
                  "Expanding the sport to include youth development programs in schools."
                ].map((item, i) => (
                  <div className="mfsaAboutAdminX-missionItem" key={i}>
                    <p>{item}</p>
                    <FiX />
                  </div>
                ))}
              </div>

              <button className="mfsaAboutAdminX-addBtn">
                <FiPlus /> Add Point
              </button>

            </div>

           
            <div className="mfsaAboutAdminX-actions">
              <button className="mfsaAboutAdminX-btnOutline">Cancel</button>
              <button className="mfsaAboutAdminX-btnPrimary">Save Changes</button>
            </div>

          </div>

        </div>
        <Preview />

      </div>
    </>
  );
}