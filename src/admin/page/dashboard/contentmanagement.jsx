import React, { useState } from "react";
import Navbar from "../navbar/nav";
import HomeContent from "../../components/content_component/homecontent";
import FooterContent from "../../components/content_component/footercontent";
import EventContent from "../../components/content_component/eventcontent";
import MembershipContent from "../../components/content_component/membershipcontent";
import NewsContent from "../../components/content_component/newscontent";
import GalleryContent from "../../components/content_component/gallerycontent";
import OtherPagesContent from "../../components/content_component/otherpagecontent";
import AssociationContent from "../../components/content_component/assosciationcontent";
import BestRecordsContent from "../../components/content_component/bestrecordcontent";
import { useNavigate } from "react-router-dom";
export default function ContentManagement() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeContent />;
      case "Association":
        return <AssociationContent />;
      case "Membership":
        return <MembershipContent />;
      case "Events":
        return <EventContent />;
      case "Gallery":
        return <GalleryContent />;
      case "Footer":
        return <FooterContent />;
      case "News":
        return <NewsContent />;
      case "Best_Reocrds":
        return <BestRecordsContent />;
      case "Other":
        return <OtherPagesContent />;
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

              <button className="preview-btn" onClick={()=>{navigate("/")}}>Preview Page</button>
            </div>

            {/* TABS */}
            <div className="mfsa-tabs-nav">
              {[
                "Home",
                "Association",
                "Membership",
                "Events",
                "Gallery",
                "News",
                "Best_Reocrds",
                "Footer",
                "Other",
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
