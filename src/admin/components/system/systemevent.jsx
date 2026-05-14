import { useMemo, useState } from "react";

import {
  FaClipboardCheck,
  FaProjectDiagram,
  FaCloudUploadAlt,
  FaSignInAlt,
  FaUsers,
  FaCog,
  FaFilter,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";

export default function SystemEvents({ data = [] }) {
  // SAFE ARRAY
  const safeData = Array.isArray(data) ? data : [];

  // FILTER STATES
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [selectedDate, setSelectedDate] = useState("");

  // ICON MAPPING
  const getIcon = (category) => {
    switch (category) {
      case "AUTH":
        return <FaSignInAlt />;

      case "MEMB":
        return <FaUsers />;

      case "CONT":
        return <FaClipboardCheck />;

      case "RECO":
        return <FaProjectDiagram />;

      case "SYST":
        return <FaCog />;

      default:
        return <FaCloudUploadAlt />;
    }
  };

  // COLOR MAPPING
  const getColor = (category) => {
    switch (category) {
      case "AUTH":
        return "blue";

      case "MEMB":
        return "gold";

      case "CONT":
        return "green";

      case "RECO":
        return "purple";

      case "SYST":
        return "gray";

      default:
        return "blue";
    }
  };

  // FORMAT DATE
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // FILTER DATA
  const filteredData = useMemo(() => {
    return safeData.filter((item) => {
      const categoryMatch =
        categoryFilter === "ALL" || item.category === categoryFilter;

      const dateMatch = selectedDate
        ? item.timestamp.startsWith(selectedDate)
        : true;

      return categoryMatch && dateMatch;
    });
  }, [safeData, categoryFilter, selectedDate]);

  // EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "Timestamp",
      "Actor",
      "Role",
      "Action",
      "Description",
      "IP Address",
      "Category",
    ];

    const rows = filteredData.map((item) => [
      item.timestamp,
      item.actor_name,
      item.actor_role,
      item.action_type,
      item.description,
      item.ip_address,
      item.category,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "system-events.csv";

    link.click();
  };

  return (
    <div className="systemEvents">
      {/* HEADER */}
      {/* HEADER */}
      <div
        className="systemEvents__header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div>
          <h1
            style={{
              marginBottom: "8px",
            }}
          >
            System Events
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
            }}
          >
            A curated log of all administrative actions within the VCET CO-PO
            ecosystem.
          </p>
        </div>

        {/* RIGHT CONTROLS */}
        <div
          className="systemEvents__header"
          style={{
            display: "flex",
            justifyContent: "space-between",
        
            gap: "20px",
          }}
        >
          {/* CATEGORY */}
          <div
            style={{
              height: "48px",
              border: "1px solid #dbe3ee",
              borderRadius: "12px",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: "10px",
            }}
          >
            <FaFilter color="#2563eb" size={15} />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                fontWeight: "600",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <option value="ALL">All Categories</option>

              <option value="AUTH">AUTH</option>

              <option value="MEMB">MEMB</option>

              <option value="CONT">CONT</option>

              <option value="RECO">RECO</option>

              <option value="SYST">SYST</option>
            </select>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              height: "48px",
              padding: "0 14px",
              borderRadius: "12px",
              border: "1px solid #dbe3ee",
              background: "#f8fafc",
              fontSize: "14px",
              fontWeight: "600",
              outline: "none",
              color: "#1e293b",
              minWidth: "180px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              lineHeight: "48px",
            }}
          />
          {/* EXPORT */}
          <button
            onClick={exportCSV}
            style={{
              height: "48px",
              padding: "0 18px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <FaDownload size={14} />
            Export
          </button>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="timeline">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className="timeline__item" key={index}>
              {/* ICON */}
              <div className={`timeline__icon ${getColor(item.category)}`}>
                {getIcon(item.category)}
              </div>

              {/* LINE */}
              <div className="timeline__line"></div>

              {/* CONTENT */}
              <div className="timeline__content">
                <div className="timeline__top">
                  <h3>{item.action_type}</h3>

                  <span>{formatDate(item.timestamp)}</span>
                </div>

                <p>{item.description}</p>

                {/* TAGS */}
                <div className="timeline__tags">
                  <span className="tag">{item.actor_role}</span>

                  <span className="tag">{item.category}</span>

                  <span className="tag">{item.ip_address}</span>
                </div>

                {/* ACTOR */}
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                  }}
                >
                  <strong
                    style={{
                      color: "#2563eb",
                    }}
                  >
                    Actor:
                  </strong>{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#1e293b",
                    }}
                  >
                    {item.actor_name}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="emptyLogs">No system events found</div>
        )}
      </div>

      {/* FOOTER */}
      <div className="archiveBtn">Load Archive Activities →</div>
    </div>
  );
}
