import { useEffect, useState } from "react";

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
import { FaTimes } from "react-icons/fa";
import {
  get_logs,
  get_full_category_logs,
  get_full_logs,
  get_full_date_logs,
} from "../../api/record";

export default function SystemEvents() {
  // ---------------- STATES ----------------
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [nextPage, setNextPage] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // DATE STATES
  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  // EXPORT STATES
  const [showExportModal, setShowExportModal] = useState(false);

  const [exportType, setExportType] = useState("ALL");

  const [exportCategory, setExportCategory] = useState("AUTH");

  const [exportFromDate, setExportFromDate] = useState("");

  const [exportToDate, setExportToDate] = useState("");

  const [exportLoading, setExportLoading] = useState(false);

  // ---------------- FETCH LOGS ----------------
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await get_logs({
          page: 1,

          category: categoryFilter,

          from_date: startDate || null,

          to_date: endDate || null,
        });

        const responseData = response?.data;

        setLogs(
          Array.isArray(responseData?.results) ? responseData.results : [],
        );

        setNextPage(responseData?.next);

        setPage(1);
      } catch (err) {
        console.error(err);

        setError("Failed to fetch logs");

        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [categoryFilter, startDate, endDate]);

  // ---------------- LOAD MORE ----------------
  const loadMoreActivities = async () => {
    try {
      if (!nextPage) return;

      setLoadingMore(true);

      const nextPageNumber = page + 1;

      const response = await get_logs({
        page: nextPageNumber,

        category: categoryFilter,

        from_date: startDate || null,

        to_date: endDate || null,
      });

      const responseData = response?.data;

      const newLogs = responseData?.results || [];

      setLogs((prev) => [...prev, ...newLogs]);

      setNextPage(responseData?.next);

      setPage(nextPageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

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

  // ---------------- FORMAT DATE ----------------
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---------------- EXPORT ----------------
  const handleExport = async () => {
    try {
      setExportLoading(true);

      let response;

      // ALL
      if (exportType === "ALL") {
        response = await get_full_logs();
      }

      // CATEGORY
      else if (exportType === "CATEGORY") {
        response = await get_full_category_logs(exportCategory);
      }

      // DATE
      else if (exportType === "DATE") {
        if (!exportFromDate || !exportToDate) {
          alert("Please select dates");

          return;
        }

        response = await get_full_date_logs(exportFromDate, exportToDate);
      }

      const responseData = response?.data;

      const exportLogs = responseData?.results || responseData || [];

      if (!Array.isArray(exportLogs) || exportLogs.length === 0) {
        alert("No logs available");

        return;
      }

      // CSV EXPORT
      const headers = [
        "Timestamp",
        "Actor",
        "Role",
        "Action",
        "Description",
        "IP Address",
        "Category",
      ];

      const rows = exportLogs.map((item) => [
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

      link.download = `logs-${Date.now()}.csv`;

      link.click();

      setShowExportModal(false);
    } catch (err) {
      console.error(err);

      alert("Export failed");
    } finally {
      setExportLoading(false);
    }
  };

  // ---------------- SKELETON ----------------
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
          marginBottom: "34px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "44px",
              fontWeight: "700",
              color: "#00008b",
              letterSpacing: "-1px",
            }}
          >
            System Events
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            Monitor and track all MFSA administrative activities, authentication
            events, membership actions, and system operations in real time.
          </p>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginLeft: "auto",
            flexWrap: "nowrap",
          }}
        >
          {/* CATEGORY */}
          <div
            style={{
              height: "50px",
              minWidth: "220px",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: "12px",
              boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
            }}
          >
            <FaFilter color="#2563eb" size={15} />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f172a",
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

          {/* START DATE */}
          <div
            style={{
              position: "relative",
            }}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "170px",
                height: "48px",
                padding: "0 14px",
                borderRadius: "14px",
                border: "1px solid #dbe3ee",
                background: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f172a",
                outline: "none",
                boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* END DATE */}
          <div
            style={{
              position: "relative",
            }}
          >
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "170px",
                height: "48px",
                padding: "0 14px",
                borderRadius: "14px",
                border: "1px solid #dbe3ee",
                background: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f172a",
                outline: "none",
                boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* EXPORT */}
          <button
            onClick={() => setShowExportModal(true)}
            style={{
              height: "50px",
              padding: "0 22px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(37,99,235,0.22)",
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
        <>
          <div className="timeline">
            {logs.length > 0 ? (
              logs.map((item, index) => (
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

          {/* LOAD MORE */}
          {nextPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <button
                onClick={loadMoreActivities}
                disabled={loadingMore}
                style={{
                  height: "50px",
                  padding: "0 24px",
                  borderRadius: "14px",
                  border: "none",
                  background: "#00008b",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  opacity: loadingMore ? 0.7 : 1,
                  boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
                }}
              >
                {loadingMore
                  ? "Loading..."
                  : `Show More Activities (Page ${page + 1})`}
              </button>
            </div>
          )}
        </>
      )}
      {/* EXPORT MODAL */}
      {showExportModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "420px",
              background: "#fff",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(15,23,42,0.2)",
              animation: "fadeIn 0.2s ease",
            }}
          >
            {/* TOP */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  Export Logs
                </h2>

                <p
                  style={{
                    marginTop: "6px",
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Download activity logs with custom filters.
                </p>
              </div>

            <button
  onClick={() =>
    setShowExportModal(
      false
    )
  }
  style={{
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border:
      "1px solid #e2e8f0",
    background: "#ffffff",
    cursor: "pointer",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    transition:
      "0.2s ease",
    boxShadow:
      "0 2px 6px rgba(15,23,42,0.05)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background =
      "#f8fafc";

    e.currentTarget.style.color =
      "#ef4444";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      "#ffffff";

    e.currentTarget.style.color =
      "#475569";
  }}
>
  <FaTimes size={13} />
</button>
            </div>

            {/* EXPORT TYPE */}
            <div
              style={{
                marginBottom: "18px",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Export Type
              </label>

              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "14px",
                  border: "1px solid #dbe3ee",
                  padding: "0 14px",
                  fontSize: "14px",
                  fontWeight: "600",
                  outline: "none",
                  background: "#fff",
                }}
              >
                <option value="ALL">Export All Logs</option>

                <option value="CATEGORY">Export by Category</option>

                <option value="DATE">Export by Date</option>
              </select>
            </div>

            {/* CATEGORY */}
            {exportType === "CATEGORY" && (
              <div
                style={{
                  marginBottom: "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Select Category
                </label>

                <select
                  value={exportCategory}
                  onChange={(e) => setExportCategory(e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "14px",
                    border: "1px solid #dbe3ee",
                    padding: "0 14px",
                    fontSize: "14px",
                    fontWeight: "600",
                    outline: "none",
                  }}
                >
                  <option value="AUTH">AUTH</option>

                  <option value="MEMB">MEMB</option>

                  <option value="CONT">CONT</option>

                  <option value="RECO">RECO</option>

                  <option value="SYST">SYST</option>
                </select>
              </div>
            )}

            {/* DATE */}
            {exportType === "DATE" && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    From Date
                  </label>

                  <input
                    type="date"
                    value={exportFromDate}
                    onChange={(e) => setExportFromDate(e.target.value)}
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "14px",
                      border: "1px solid #dbe3ee",
                      padding: "0 14px",
                      fontSize: "14px",
                      fontWeight: "600",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    To Date
                  </label>

                  <input
                    type="date"
                    value={exportToDate}
                    onChange={(e) => setExportToDate(e.target.value)}
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "14px",
                      border: "1px solid #dbe3ee",
                      padding: "0 14px",
                      fontSize: "14px",
                      fontWeight: "600",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  height: "46px",
                  padding: "0 18px",
                  borderRadius: "14px",
                  border: "1px solid #dbe3ee",
                  background: "#fff",
                  color: "#0f172a",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleExport}
                disabled={exportLoading}
                style={{
                  height: "46px",
                  padding: "0 20px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  opacity: exportLoading ? 0.7 : 1,
                  boxShadow: "0 10px 24px rgba(37,99,235,0.2)",
                }}
              >
                <FaDownload />

                {exportLoading ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
