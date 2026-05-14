import {
  FaUserPlus,
  FaClipboardCheck,
  FaBuilding,
  FaProjectDiagram,
  FaCloudUploadAlt,
  FaSignInAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";

export default function SystemEvents({ data = [] }) {
  // Icon mapping based on category/action
  const getIcon = (category, action) => {
    if (category === "AUTH")
      return <FaSignInAlt />;

    if (category === "MEMB")
      return <FaUsers />;

    if (category === "CONT")
      return <FaClipboardCheck />;

    if (category === "RECO")
      return <FaProjectDiagram />;

    if (category === "SYST")
      return <FaCog />;

    return <FaCloudUploadAlt />;
  };

  // Color mapping
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

  // Format time
  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="systemEvents">
      <div className="systemEvents__header">
        <h1>System Events</h1>

        <p>
          A curated log of all
          administrative actions within
          the VCET CO-PO ecosystem.
        </p>
      </div>

      <div className="timeline">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              className="timeline__item"
              key={index}
            >
              {/* ICON */}
              <div
                className={`timeline__icon ${getColor(
                  item.category
                )}`}
              >
                {getIcon(
                  item.category,
                  item.action_type
                )}
              </div>

              <div className="timeline__line"></div>

              {/* CONTENT */}
              <div className="timeline__content">
                <div className="timeline__top">
                  <h3>
                    {item.action_type}
                  </h3>

                  <span>
                    {formatDate(
                      item.timestamp
                    )}
                  </span>
                </div>

                <p>{item.description}</p>

                {/* TAGS */}
                <div className="timeline__tags">
                  <span className="tag">
                    {item.actor_role}
                  </span>

                  <span className="tag">
                    {item.category}
                  </span>

                  <span className="tag">
                    {item.ip_address}
                  </span>
                </div>

                {/* EXTRA */}
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    opacity: 0.7,
                  }}
                >
                  <strong>Actor:</strong>{" "}
                  {item.actor_name}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="emptyLogs">
            No system events found
          </div>
        )}
      </div>

      <div className="archiveBtn">
        Load Archive Activities →
      </div>
    </div>
  );
}