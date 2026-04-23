import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { get_state } from "../../../../user/api/auth";
import { useQuery } from "@tanstack/react-query";
import { leaveMembership } from "../../../api/membership";
import AlertPopup from "../../../../user/hooks/popuptemplate";
export default function AthleteLeaveMembershipModal({ isOpen, onClose, id }) {
  const [selectedState, setSelectedState] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setError("");

    if (!selectedState) {
      setError("Please select a state");
      return;
    }

    try {
      setLoading(true);

      const res = await leaveMembership(id, selectedState); // ⚠️ pass correct value

      if (res?.status === 200 || res?.status === 201) {
        // ✅ SUCCESS ALERT
        setAlert({
          message: "Membership switched successfully 🎉",
          type: "success",
        });

        // close modal after short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setAlert({
          message: "Unexpected response ❌",
          type: "error",
        });
      }
    } catch (e) {
      const errData = e?.response?.data;

      let message = "Something went wrong ❌";

      if (typeof errData === "string") {
        message = errData;
      } else if (errData?.message) {
        message = errData.message;
      } else if (typeof errData === "object") {
        message = Object.values(errData).flat().join(", ");
      }

      // ✅ ERROR ALERT
      setAlert({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="leaveModalOverlay">
        <div className="leaveModal">
          {/* HEADER */}
          <div className="leaveModalHeader">
            <FaExclamationTriangle className="warnIcon" />
            <div>
              <h2>Leave Membership</h2>
              <p>You can rejoin under a new state</p>
            </div>
          </div>

          <div className="leaveWarning">
            Leaving will deactivate your current benefits, rankings, and access.
          </div>

          <div className="formGroup">
            <label>Select New State *</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Choose your state</option>
              {states.map((s) => (
                <option key={s.user} value={s.user}>
                  {s.state_name}
                </option>
              ))}
            </select>
          </div>

          {/* ERROR */}
          {error && <div className="errorBox">{error}</div>}

          {/* BUTTONS */}
          <div className="modalActions">
            <button className="btnCancel" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btnConfirm"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm & Switch"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
