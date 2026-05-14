import { useEffect, useMemo, useState } from "react";

import {
  FaClipboardCheck,
  FaProjectDiagram,
  FaCloudUploadAlt,
  FaSignInAlt,
  FaUsers,
  FaCog,
  FaFilter,
  FaDownload,
} from "react-icons/fa";

import { get_particuler_logs } from "../../api/record";

export default function SystemEvents({ data = [] }) {
  // ---------------- STATES ----------------
  const [logs, setLogs] = useState(Array.isArray(data) ? data : []);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [selectedDate, setSelectedDate] = useState("");

  // ---------------- FETCH CATEGORY LOGS ----------------
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        setError("");

        // ALL CATEGORY
        if (categoryFilter === "ALL") {
          setLogs(Array.isArray(data) ? data : []);

          return;
        }

        // API CALL
        const response = await get_particuler_logs(categoryFilter);

        const responseData = response?.data?.results;

        setLogs(Array.isArray(responseData) ? responseData : []);
      } catch (err) {
        console.error(err);

        setError("Failed to fetch logs");

        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [categoryFilter, data]);

  // ---------------- ICONS ----------------
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

  // ---------------- COLORS ----------------
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

  // ---------------- DATE FORMAT ----------------
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---------------- DATE FILTER ----------------
  const filteredData = useMemo(() => {
    return logs.filter((item) => {
      const dateMatch = selectedDate
        ? item.timestamp.startsWith(selectedDate)
        : true;

      return dateMatch;
    });
  }, [logs, selectedDate]);

  // ---------------- EXPORT ----------------
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

  // ---------------- LOADING SKELETON ----------------
  const Skeleton = () => {
    return (
      <div
        style={{
          padding: "20px",
        }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              height: "120px",
              background: "#f1f5f9",
              borderRadius: "14px",
              marginBottom: "18px",
              animation: "pulse 1.5s infinite",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="systemEvents">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
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
              color: "#64748b",
            }}
          >
            A curated log of all administrative actions within the VCET CO-PO
            ecosystem.
          </p>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            // alignItems: "center",
            flexWrap: "nowrap",
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

          {/* DATE */}
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

      {/* ERROR */}
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <Skeleton />
      ) : (
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
            <div
              style={{
                padding: "40px 0",
                textAlign: "center",
                color: "#64748b",
                fontWeight: "500",
              }}
            >
              No system events found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
