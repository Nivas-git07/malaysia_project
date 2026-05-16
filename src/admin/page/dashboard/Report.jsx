import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Report.css";
import { getReport } from "../../api/report_api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

import {
  FiUsers,
  FiCalendar,
  FiFileText,
  FiAward,
  FiRefreshCw,
  FiDownload,
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
        </div>
      </div>
    </>
  );
}
