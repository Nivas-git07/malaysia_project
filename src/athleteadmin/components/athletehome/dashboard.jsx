import banner from "../../assets/swim.png";
import { MdEvent } from "react-icons/md";
import { FaShieldAlt, FaUserAlt } from "react-icons/fa";
import { GiFinishLine } from "react-icons/gi";
import { IoTrophy } from "react-icons/io5";

// import { FaCrown, FaMapMarkerAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  FaFlagCheckered,
  FaCrown,
  FaTrophy,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { get_dashboard_data } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
// import "./recent-events.css";
import photo from "../../assets/swim.png";
import { FaCalendarAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
export default function AthleteHome() {
  const navigate = useNavigate();
  const { data: dashboardData } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: get_dashboard_data,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const dashboard = dashboardData?.data || {};

  const analytics = dashboard.analytics_data || {};
  const participate_events =  [];
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

          <div
            className="athleteActionBtn"
            onClick={() => navigate("/athlete/events")}
          >
            <MdEvent className="actionIcon" /> Register Event →
          </div>

          <div
            className="athleteActionBtn"
            onClick={() => navigate("/athlete/membership")}
          >
            <FaShieldAlt className="actionIcon" /> View Membership →
          </div>

          <div
            className="athleteActionBtn"
            onClick={() => navigate("/athlete/profile")}
          >
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
            <h3 className="statValue">
              {analytics.events_participated || "0"}
            </h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox blueBg">
              <FaCrown />
            </div>
            <p className="statLabel">Total Medals</p>
            <h3 className="statValue">{analytics.total_medals || "0"}</h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox greenBg">
              <FaTrophy />
            </div>
            <p className="statLabel">Total Gold</p>
            <h3 className="statValue">{analytics.total_gold || "0"}</h3>
          </div>

          <div className="athleteStatCard">
            <div className="iconBox orangeBg">
              <FaClipboardList />
            </div>
            <p className="statLabel">Best Record</p>
            <h3 className="statValue">{analytics.best_record || "-"}</h3>
          </div>
        </div>
      </div>
      <div className="eventsContainer">
        {/* HEADER */}
        <div className="eventsHeader">
          <h2>Recent Events</h2>
          <span className="viewAll">View All Schedule</span>
        </div>
        {participate_events && participate_events.length > 0 ? (
          participate_events.map((event) => {
            return (
              <div key={event.event_id} className="eventCard">
                <img src={event.image} alt="" className="eventImg" />

                <div className="eventContent">
                  <p className="eventType red">ELITE SERIES</p>
                  <h3>{event.event_name}</h3>

                  <div className="eventMeta">
                    <FaCalendarAlt />
                    <span>
                      {event.date} • {event.venue}
                    </span>
                  </div>
                </div>

                <div className="eventRight">
                  <span className="status green">REGISTERED</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="emptyEventState">
            <div className="emptyIcon">📅</div>

            <h3>No Events Registered</h3>

            <p>
              You haven’t registered for any events yet. Start exploring
              upcoming competitions and participate.
            </p>

            <button className="browseBtn" onClick={() => navigate("/event")}>
              Browse Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
