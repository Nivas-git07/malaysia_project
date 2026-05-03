import { useState } from "react";
import { FiUploadCloud, FiPlus } from "react-icons/fi";
import Navbar from "../navbar/nav";
import { FiSearch, FiFilter } from "react-icons/fi";
export default function Support() {
  const [file, setFile] = useState(null);
  const tickets = [
    {
      id: "#MFSA-1025",
      subject: "Issue with lane booking API",
      category: "Technical",
      status: "Open",
      date: "Oct 24, 2023",
    },
    {
      id: "#MFSA-1021",
      subject: "New athlete registration error",
      category: "Membership",
      status: "In Progress",
      date: "Oct 22, 2023",
    },
    {
      id: "#MFSA-1018",
      subject: "Payment verification failed",
      category: "Technical",
      status: "Resolved",
      date: "Oct 18, 2023",
    },
    {
      id: "#MFSA-0998",
      subject: "Event rule clarification",
      category: "Event",
      status: "Closed",
      date: "Oct 12, 2023",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="mfsaTicketX-wrapper">
          {/* HEADER */}
          <div className="mfsaTicketX-header">
            <div className="mfsaTicketX-headerLeft">
              <h1 className="mfsaTicketX-title">Support & Tickets</h1>
              <p className="mfsaTicketX-sub">
                Raise issues and track your support requests
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="mfsaTicketX-grid">
            {/* FORM */}
            <div className="mfsaTicketX-card">
              <h3 className="mfsaTicketX-cardTitle">Submit a New Request</h3>

              <div className="mfsaTicketX-row">
                <div className="mfsaTicketX-group">
                  <label>Subject</label>
                  <input placeholder="Brief summary of the issue" />
                </div>

                <div className="mfsaTicketX-group">
                  <label>Category</label>
                  <select>
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>General</option>
                  </select>
                </div>
              </div>

              <div className="mfsaTicketX-group">
                <label>Description</label>
                <textarea placeholder="Detailed explanation..." />
              </div>

              {/* UPLOAD */}

              <button className="mfsaTicketX-submit">Submit Ticket</button>
            </div>

            {/* RIGHT */}
            <div className="mfsaTicketX-right">
              <div className="mfsaTicketX-priority">
                <h3>Priority Assistance</h3>
                <p>Elite members receive support within 2 business hours.</p>
              </div>

              <div className="mfsaTicketX-activity">
                <h4>Recent Activity</h4>

                <div className="mfsaTicketX-activityItem">
                  <span className="mfsaTicketX-bar blue"></span>
                  <div>
                    <p className="mfsaTicketX-activityItemPara">Ticket #MFSA-992 Closed</p>
                    <span>2 hours ago</span>
                  </div>
                </div>

                <div className="mfsaTicketX-activityItem">
                  <span className="mfsaTicketX-bar red"></span>
                  <div>
                    <p className="mfsaTicketX-activityItemPara">Agent replied to #MFSA-104</p>
                    <span>Yesterday 14:20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mfsaSupportX-wrapper">
        
            <div className="mfsaSupportX-header">
              <h2>Active Support Logs</h2>

              <div className="mfsaSupportX-actions">
                <FiFilter />
                <FiSearch />
              </div>
            </div>

         
            <div className="mfsaSupportX-tableWrap">
              <table className="mfsaSupportX-table">
                <thead>
                  <tr>
                    <th>TICKET ID</th>
                    <th>SUBJECT</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>CREATED DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((t, i) => (
                    <tr key={i}>
                      <td className="mfsaSupportX-id">{t.id}</td>

                      <td className="mfsaSupportX-subject">{t.subject}</td>

                      <td>
                        <span className="mfsaSupportX-badge">{t.category}</span>
                      </td>

                      <td>
                        <span
                          className={`mfsaSupportX-status ${t.status
                            .toLowerCase()
                            .replace(/\s+/g, "_")}`}
                        >
                          ● {t.status}
                        </span>
                      </td>

                      <td>{t.date}</td>

                      <td>
                        <span className="mfsaSupportX-link">View Details</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mfsaSupportX-footer">
                <p>Showing 4 of 28 support tickets</p>

                <div className="mfsaSupportX-pagination">
                  <button>Previous</button>
                  <button>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
