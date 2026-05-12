import {
  FaUserPlus,
  FaClipboardCheck,
  FaBuilding,
  FaProjectDiagram,
  FaCloudUploadAlt,
} from "react-icons/fa";


export default function SystemEvents() {
  const events = [
    {
      icon: <FaUserPlus />,
      title: "Teacher added",
      description:
        "Dr. Anjali Sharma was successfully onboarded to the Department of Information Technology as a Senior Professor.",
      tags: ["IT DEPT", "ID: 4022"],
      time: "OCT 24, 10:45 AM",
      color: "blue",
    },

    {
      icon: <FaClipboardCheck />,
      title: "Marks updated",
      description:
        "Continuous Internal Evaluation (CIE-2) marks for 'Advanced Algorithms' have been finalized and published to the student portal.",
      tags: ["SEMESTER 7", "BATCH 2024"],
      time: "OCT 24, 09:12 AM",
      color: "gold",
    },

    {
      icon: <FaBuilding />,
      title: "New department created",
      description:
        "Artificial Intelligence & Machine Learning (AI-ML) department has been initialized with the standard CO-PO framework template.",
      tags: ["SYSTEM CONFIG"],
      time: "OCT 23, 04:30 PM",
      color: "blue",
    },

    {
      icon: <FaProjectDiagram />,
      title: "PO Mapping Revised",
      description:
        "The Program Outcome mapping for 'Microprocessors Lab' was updated to better align with NAAC accreditation standards for Criterion 2.",
      tags: [
        "ACCREDITATION",
        "CRITICAL UPDATE",
      ],
      time: "OCT 23, 11:00 AM",
      color: "blue",
    },

    {
      icon: <FaCloudUploadAlt />,
      title: "System Backup Complete",
      description:
        "A full differential backup of the CO-PO database was successfully pushed to the secure secondary storage cluster.",
      tags: ["AUTOMATED", "V2.4.1"],
      time: "OCT 22, 11:59 PM",
      color: "gray",
    },
  ];

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
        {events.map((item, index) => (
          <div
            className="timeline__item"
            key={index}
          >
            <div
              className={`timeline__icon ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="timeline__line"></div>

            <div className="timeline__content">
              <div className="timeline__top">
                <h3>{item.title}</h3>

                <span>{item.time}</span>
              </div>

              <p>
                {item.description}
              </p>

              <div className="timeline__tags">
                {item.tags.map(
                  (tag, i) => (
                    <span
                      key={i}
                      className={`tag ${
                        tag ===
                        "CRITICAL UPDATE"
                          ? "danger"
                          : ""
                      }`}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="archiveBtn">
        Load Archive Activities →
      </div>
    </div>
  );
}