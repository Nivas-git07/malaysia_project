import { useState } from "react";
import { FiX, FiClock, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

export default function TicketResponseModal({ ticket, onClose, onSubmit }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const maxLength = 2000;

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await onSubmit({ message, status });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trOverlay">
      <div className="trModal">
        {/* HEADER */}
        <div className="trHeader">
          <div>
            <h3>Respond to Ticket</h3>
            <p>Update status and provide response</p>
          </div>
          <FiX className="trClose" onClick={onClose} />
        </div>

        {/* TICKET INFO */}
        <div className="trInfoCard">
          <div className="trInfoLeft">
            <div className="trIcon">🎫</div>
            <div>
              <p className="trTicketId">#{ticket?.id}</p>
              <p className="trEmail">{ticket?.email}</p>
              <span className="trMeta">Priority: High • Created 2h ago</span>
            </div>
          </div>

          <span className={`trBadge ${status.toLowerCase()}`}>
            {status.replace("_", " ")}
          </span>
        </div>

        {/* MESSAGE */}
        <div className="trField">
          <label>Response Message</label>

          <div className="trTextareaWrap">
            <textarea
              placeholder="Write your response to the user..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={maxLength}
            />
            <span className="trCount">
              {message.length} / {maxLength}
            </span>
          </div>
        </div>

        {/* STATUS */}
        <div className="trField">
          <label>Update Status</label>

          <div className="trSegment">
            <button
              className={status === "PENDING" ? "active" : ""}
              onClick={() => setStatus("PENDING")}
            >
              <FiClock /> Pending
            </button>

            <button
              className={status === "IN_PROGRESS" ? "active" : ""}
              onClick={() => setStatus("IN_PROGRESS")}
            >
              <FiRefreshCw /> In Progress
            </button>

            <button
              className={status === "RESOLVED" ? "active" : ""}
              onClick={() => setStatus("RESOLVED")}
            >
              <FiCheckCircle /> Resolved
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="trFooter">
          <button className="trCancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="trSubmit"
            onClick={handleSubmit}
            disabled={!message.trim() || loading}
          >
            {loading ? "Sending..." : "Send Response"}
          </button>
        </div>
      </div>
    </div>
  );
}