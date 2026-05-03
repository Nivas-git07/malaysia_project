import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import Navbar from "../navbar/nav";
import { raise_ticket, get_my_ticket } from "../../api/ticket";
import { useQuery } from "@tanstack/react-query";

export default function Support() {
  /* ---------------- FETCH DATA ---------------- */
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get_my_ticket"],
    queryFn: get_my_ticket,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const tickets = data?.data || [];

  /* ---------------- STATE ---------------- */
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const formatStatus = (status) =>
    status
      ?.toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.subject || !form.message) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        problem: form.subject,
        detail: form.message,
      };

      const res = await raise_ticket(payload);

      if (res.status === 200 || res.status === 201) {
        alert("Ticket Raised Successfully ✅");

        setForm({
          subject: "",
          message: "",
        });

        refetch(); // 🔥 refresh table
      }
    } catch (err) {
      console.error(err?.response?.data || err);
      alert("Failed to raise ticket ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMPTY COMPONENT ---------------- */
  const EmptyBox = ({ title, subtitle }) => (
    <div className="mfsaEmptyBoxX">
      <p>{title}</p>
      <span>{subtitle}</span>
    </div>
  );

  /* ---------------- UI ---------------- */
  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="mfsaTicketX-wrapper">

          {/* HEADER */}
          <div className="mfsaTicketX-header">
            <div>
              <h1 className="mfsaTicketX-title">Support & Tickets</h1>
              <p className="mfsaTicketX-sub">
                Raise issues and track your support requests
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="mfsaTicketX-grid">

            {/* LEFT FORM */}
            <div className="mfsaTicketX-card">
              <h3 className="mfsaTicketX-cardTitle">
                Submit a New Request
              </h3>

              <div className="mfsaTicketX-group">
                <label>Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Brief summary of the issue"
                />
              </div>

              <div className="mfsaTicketX-group">
                <label>Description</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Detailed explanation..."
                />
              </div>

              <button
                className="mfsaTicketX-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="mfsaTicketX-right">

              <div className="mfsaTicketX-priority">
                <h3>Priority Assistance</h3>
                <p>
                  Elite members receive support within 2 business hours.
                </p>
              </div>

              <div className="mfsaTicketX-activity">
                <h4>Recent Activity</h4>

                {tickets.length === 0 ? (
                  <EmptyBox
                    title="No recent activity"
                    subtitle="No ticket updates available"
                  />
                ) : (
                  tickets.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className="mfsaTicketX-activityItem"
                    >
                      <span
                        className={`mfsaTicketX-bar ${
                          t.status === "RESOLVED"
                            ? "green"
                            : t.status === "IN_PROGRESS"
                            ? "yellow"
                            : "red"
                        }`}
                      ></span>

                      <div>
                        <p  className="mfsaTicketX-activityItemPara">{t.problem}</p>
                        <span>{formatDate(t.created_at)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}
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
                    <th>STATUS</th>
                    <th>CREATED DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="5">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5">
                        Failed to load tickets ❌
                      </td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <EmptyBox
                          title="No tickets found"
                          subtitle="There are no support tickets"
                        />
                      </td>
                    </tr>
                  ) : (
                    tickets.map((t) => (
                      <tr key={t.id}>
                        <td className="mfsaSupportX-id">
                          #{t.id.slice(0, 6)}
                        </td>

                        <td className="mfsaSupportX-subject">
                          {t.problem}
                        </td>

                        <td>
                          <span
                            className={`mfsaSupportX-status ${t.status
                              .toLowerCase()
                              .replace(/\s+/g, "_")}`}
                          >
                            ● {formatStatus(t.status)}
                          </span>
                        </td>

                        <td>
                          {formatDate(t.created_at)}
                        </td>

                        <td>
                          <span className="mfsaSupportX-link">
                            View Details
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="mfsaSupportX-footer">
                <p>
                  Showing {tickets.length} tickets
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}