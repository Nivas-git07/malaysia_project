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
import { get_check } from "../../../user/api/home_api";
import { useQuery } from "@tanstack/react-query";

export default function ContentManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");

  const { data, isLoading } = useQuery({
    queryKey: ["checksession"],
    queryFn: get_check,
  });

  const role = data?.data?.role || null;

  const TAB_CONFIG = [
    { name: "Home", roles: ["SUPERADMIN", "STAFF", "STATE", "CLUB"] },
    { name: "Association", roles: ["SUPERADMIN"] },
    { name: "Membership", roles: ["SUPERADMIN"] }, // 🔥 only SUPERADMIN
    { name: "Events", roles: ["SUPERADMIN", "STATE", "CLUB"] },
    { name: "Gallery", roles: ["SUPERADMIN", "STATE", "CLUB"] },
    { name: "News", roles: ["SUPERADMIN", "STATE", "CLUB"] },
    { name: "Best_Reocrds", roles: ["SUPERADMIN", "STATE", "CLUB"] },
    { name: "Footer", roles: ["SUPERADMIN"] }, // 🔥 only SUPERADMIN
    { name: "Other", roles: ["SUPERADMIN", "STATE", "CLUB"] },
  ];

  const filteredTabs = TAB_CONFIG.filter((tab) => tab.roles.includes(role));

  /* =========================
     SAFE CONTENT RENDER
  ========================== */
  const isAllowed = TAB_CONFIG.find(
    (t) => t.name === activeTab && t.roles.includes(role),
  );

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

  /* =========================
     LOADING STATE
  ========================== */
  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

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

              <button className="preview-btn" onClick={() => navigate("/")}>
                Preview Page
              </button>
            </div>

            {/* TABS */}
            <div className="mfsa-tabs-nav">
              {filteredTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`mfsa-tab-item ${
                    activeTab === tab.name ? "mfsa-active-tab" : ""
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* 🚫 BLOCK UNAUTHORIZED ACCESS */}
            {!isAllowed ? (
              <div className="noAccessPage">
                <h2>No Access</h2>
                <p>You are not allowed to view this section.</p>
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </>
  );
}
