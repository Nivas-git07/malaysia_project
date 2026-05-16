import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Report.css";
import { getReport } from "../../api/report_api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import {
  FiInbox,
  FiRepeat,
  FiShield,
} from "react-icons/fi";
import {
  FiUsers,
  FiCalendar,
  FiFileText,
  FiAward,
  FiRefreshCw,
  FiDownload,
  FiInfo,
} from "react-icons/fi";

export default function Report() {
  const cards = [
    {
      title: "TOTAL ATHLETES",
      value: "12,482",
      trend: "+12% from last month",
      color: "#16a34a",
      icon: <FiUsers />,
    },
    {
      title: "TOTAL EVENTS",
      value: "842",
      trend: "+4% this season",
      color: "#16a34a",
      icon: <FiCalendar />,
    },
    {
      title: "TOTAL NEWS",
      value: "1,204",
      trend: "Stable engagement",
      color: "#6b7280",
      icon: <FiFileText />,
    },
    {
      title: "ACTIVE MEMBERS",
      value: "9,120",
      trend: "-2.1% renewal gap",
      color: "#dc2626",
      icon: <FiAward />,
    },
  ];
  const {
    data: eventRecords,
    isLoading,
    error,
    refetch,
  } = getReport({
    queryKey: ["getreport"],
    queryFn: getReport,
    retry: false,
  });

  console.log("Event Records:", eventRecords);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="table" count={4} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load report data"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="reports-container">
          {/* Header */}
          <div className="reports-top">
            <div>
              <h1>Reports & Analytics</h1>
              <p>Real-time federation overview and performance metrics</p>
            </div>

            <div className="top-buttons">
              <button className="refresh-btn">
                <FiRefreshCw />
                Category
              </button>

              <button className="export-btn">
                <FiDownload />
                Export Report
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="reports-grid">
            {cards.map((card, index) => (
              <div className="report-card" key={index}>
                <div className="card-top">
                  <div>
                    <span className="card-title">{card.title}</span>

                    <h2>{card.value}</h2>

                    <p className="trend-text" style={{ color: card.color }}>
                      {card.trend}
                    </p>
                  </div>

                  <div className="icon-box">{card.icon}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="analytics-grid">
            {/* LEFT CARD */}
            <div className="analytics-card">
              <div className="analytics-header">
                <div>
                  <h3>Membership Distribution</h3>
                  <p>Segmentation by professional category</p>
                </div>

                <button className="info-btn">
                  <FiInfo size={16} />
                </button>
              </div>

              <div className="distribution-wrapper">
                {/* Donut Chart */}
                <div className="donut-chart">
                  <div className="donut-center">
                    <h2>8.9k</h2>
                    <span>Total Members</span>
                  </div>
                </div>

                {/* Legends */}
                <div className="legend-list">
                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot red"></span>
                      <p>Elite Members</p>
                    </div>

                    <strong>45%</strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot black"></span>
                      <p>Professional</p>
                    </div>

                    <strong>25%</strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot blue"></span>
                      <p>Standard</p>
                    </div>

                    <strong>20%</strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot gray"></span>
                      <p>Other</p>
                    </div>

                    <strong>10%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="analytics-card">
              <div className="analytics-header">
                <div>
                  <h3>System Health</h3>
                  <p>Platform activity and operational overview</p>
                </div>

                <div className="health-badge">ALL SYSTEMS NOMINAL</div>
              </div>

              <div className="health-wrapper">
                {/* ITEM */}
                <div className="health-item">
                  <div className="health-top">
                    <div className="health-left">
                      <div className="health-icon ticket-icon">
                        <FiInbox />
                      </div>

                      <div>
                        <h4>Pending Support Tickets</h4>
                        <p>42 tickets require administrative action</p>
                      </div>
                    </div>

                    <strong>42</strong>
                  </div>

                  <div className="health-progress">
                    <div className="health-fill ticket-fill"></div>
                  </div>
                </div>

                {/* ITEM */}
                <div className="health-item">
                  <div className="health-top">
                    <div className="health-left">
                      <div className="health-icon transfer-icon">
                        <FiRepeat />
                      </div>

                      <div>
                        <h4>Athlete Transfers</h4>
                        <p>Inter-federation requests in review</p>
                      </div>
                    </div>

                    <strong>18</strong>
                  </div>

                  <div className="health-progress">
                    <div className="health-fill transfer-fill"></div>
                  </div>
                </div>

                {/* ITEM */}
                <div className="health-item">
                  <div className="health-top">
                    <div className="health-left">
                      <div className="health-icon membership-icon">
                        <FiShield />
                      </div>

                      <div>
                        <h4>Active Memberships</h4>
                        <p>Retention rate vs new registrations</p>
                      </div>
                    </div>

                    <strong>92%</strong>
                  </div>

                  <div className="health-progress">
                    <div className="health-fill membership-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===================== ANALYTICS SECTION ===================== */}
      </div>
    </>
  );
}
