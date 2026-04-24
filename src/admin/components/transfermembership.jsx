import { IoClose } from "react-icons/io5";
import { approve_target_transfer } from "../api/membership";
export default function PendingPopup({ data, onClose }) {
  const handleApprove = async () => {
    try {
      await approve_target_transfer(data.id);
      alert("Transfer approved successfully!");
    } catch (error) {
      console.error("Error approving transfer:", error);
    }
  };
  return (
    <div className="membership-popup-overlay">
      <div className="membership-popup-card">
        <div className="membership-popup-header">
          <h2 className="membership-popup-title">State Transfer Request</h2>
          <button className="membership-popup-close" onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        <div className="membership-popup-body">
          <div className="membership-item">
            <div className="membership-label">Request ID</div>
            <div className="membership-value">{data.id}</div>
          </div>

          <div className="membership-item">
            <div className="membership-label">Status</div>
            <div className="statuss pending">{data.status}</div>
          </div>

          <div className="membership-item">
            <div className="membership-label">Requester</div>
            <div className="membership-value">{data.requester}</div>
          </div>

          <div className="membership-item">
            <div className="membership-label">Current State</div>
            <div className="membership-value">{data.current_state_name}</div>
          </div>

          <div className="membership-item">
            <div className="membership-label">Target State</div>
            <div className="membership-value">{data.target_state_name}</div>
          </div>

          <div className="membership-item">
            <div className="membership-label">Requested At</div>
            <div className="membership-value">
              {new Date(data.requested_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="membership-popup-footer">
          <button className="membership-reject-btn" onClick={onReject}>
            Reject
          </button>
          <button className="membership-action-btn" onClick={onApprove}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
