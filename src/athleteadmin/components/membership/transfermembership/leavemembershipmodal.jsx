import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { get_state } from "../../../../user/api/auth";
import { useQuery } from "@tanstack/react-query";
import { leaveclubMembership} from "../../../../admin/api/membership";
import AlertPopup from "../../../../user/hooks/popuptemplate";
import { checksession } from "../../../../admin/api/home_api";
import { getmembershipClubList } from "../../../../admin/api/home_api";
import "../../../../admin/style/dashboard/ManageUser.css";
export default function AthleteLeaveMembershipModal({ isOpen, onClose, id }) {
  const [selectedState, setSelectedState] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(id)
  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const { data: sessiondata } = useQuery({
    queryKey: ["sessiondata"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = sessiondata?.data;
  const state_id = user?.state_id;

  // console.log("state_id:", state_id);

  const { data: clubListData } = useQuery({
    queryKey: ["get_club_list", state_id],
    queryFn: () => getmembershipClubList(state_id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!state_id,
  });

  // console.log(clubListData?.data.clubs_list);
  const club = clubListData?.data.clubs_list;

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

      const res = await leaveclubMembership(id, selectedState); 

      console.log("check membership status",res)

      if (res?.status === 200 || res?.status === 201) {
        // ✅ SUCCESS ALERT
        setAlert({
          message: "your transfer Membership initial process successfully 🎉",
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
            <label>Select New club *</label>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!club || club.length === 0} 
            >
          
              <option value="">
                {club?.length > 0
                  ? "Choose your club"
                  : "No clubs found in this state"}
              </option>

             
              {club?.length > 0 &&
                club.map((s) => (
                  <option key={s.user} value={s.user}>
                    {s.club_name}
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
