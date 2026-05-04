import React, { useState } from "react";
import Navbar from "../navbar/nav";
import HomeContent from "../../components/content_component/homecontent";
export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeContent />;
      case "About":
        return <div className="cm-placeholder">About Page Coming</div>;
      case "Membership":
        return <div className="cm-placeholder">Membership Page Coming</div>;
      case "Events":
        return <div className="cm-placeholder">Events Page Coming</div>;
      case "Gallery":
        return <div className="cm-placeholder">Gallery Page Coming</div>;
      case "Contact":
        return <div className="cm-placeholder">Contact Page Coming</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="cm-container">
          <div className="cm-wrapper">
            {/* HEADER */}
            <div className="cm-header">
              <div>
                <h1>Content Management</h1>
                <p>Edit and manage website content</p>
              </div>

              <button className="preview-btn">Preview Page</button>
            </div>

            {/* TABS */}
            <div className="mfsa-tabs-nav">
              {[
                "Home",
                "About",
                "Membership",
                "Events",
                "Gallery",
                "Contact",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mfsa-tab-item ${
                    activeTab === tab ? "mfsa-active-tab" : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* DYNAMIC PAGE */}
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
