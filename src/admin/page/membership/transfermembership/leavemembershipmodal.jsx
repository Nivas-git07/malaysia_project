import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { get_state } from "../../../../user/api/auth";
import { useQuery } from "@tanstack/react-query";
export default function LeaveMembershipModal({
  isOpen,
  onClose,
  onSubmit, // async function
}) {
  const [selectedState, setSelectedState] = useState("");
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

    // ✅ VALIDATION
    if (!selectedState) {
      setError("Please select a state");
      return;
    }

    try {
      setLoading(true);

      // ✅ CALL API FROM PARENT
      const res = await onSubmit(selectedState);

      // ✅ HANDLE SUCCESS
      if (res?.status === 200 || res?.status === 201) {
        onClose(); // close popup
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (e) {
      // ✅ HANDLE ALL ERROR TYPES
      const errData = e?.response?.data;

      if (typeof errData === "string") {
        setError(errData);
      } else if (errData?.message) {
        setError(errData.message);
      } else if (typeof errData === "object") {
        // multiple backend errors
        const messages = Object.values(errData)
          .flat()
          .join(", ");
        setError(messages);
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}