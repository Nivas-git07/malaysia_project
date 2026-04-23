import React from "react";
import banner from "../../assets/swim.png";
import { MdEvent } from "react-icons/md";
import { FaShieldAlt, FaUserAlt } from "react-icons/fa";
import { GiFinishLine } from "react-icons/gi";
import { IoTrophy } from "react-icons/io5";
import RecentEvents from "./recentevent";
// import { FaCrown, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaFlagCheckered,
  FaCrown,
  FaTrophy,
  FaMapMarkerAlt,
} from "react-icons/fa";
export default function AthleteHome() {
  return (
    <div className="athleteDashboard">
      {/* TOP */}
      <div className="athleteTopSection">
        {/* BANNER */}
        <div className="athleteWelcomeCard">
          <img src={banner} alt="swim" className="athleteBannerImg" />
          <div className="athleteOverlay">
            <h1 className="athleteTitle">Welcome back, Sarah.</h1>
            <p className="athleteSubtitle">
              Your performance stats are up 12% this month. <br />
              You're currently ranked 4th in the Elite Division.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="athleteActionCard">
          <p className="athleteSmallTitle">QUICK ACTIONS</p>
          <h2 className="athleteActionTitle">Master Control</h2>

          <div className="athleteActionBtn">
            <MdEvent className="actionIcon" /> Register Event →
          </div>

          <div className="athleteActionBtn">
            <FaShieldAlt className="actionIcon" /> View Membership →
          </div>

          <div className="athleteActionBtn">
            <FaUserAlt className="actionIcon" /> Update Profile →
          </div>
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="athleteAnalyticsSection">
        <p className="athleteSmallTitle">PERFORMANCE SUMMARY</p>
        <h2 className="athleteAnalyticsTitle">Career Analytics</h2>

        <div className="athleteCardGrid">
          <div className="athleteStatCard">
            <div className="iconBox redBg">
              <FaFlagCheckered />
            </div>
            <p className="statLabel">EVENTS PARTICIPATED</p>
            <h3 className="statValue">24</h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox blueBg">
              <FaCrown />
            </div>
            <p className="statLabel">UPCOMING EVENTS</p>
            <h3 className="statValue">03</h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox greenBg">
              <FaTrophy />
            </div>
            <p className="statLabel">MEMBERSHIP STATUS</p>
            <h3 className="statValue">ACTIVE</h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox orangeBg">
              <FaMapMarkerAlt />
            </div>
            <p className="statLabel">TOTAL RECORDS</p>
            <h3 className="statValue">12</h3>
          </div>
        </div>
      </div>
      <RecentEvents />
    </div>
  );
}
