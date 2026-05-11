import Navbar from "../navbar/nav";
import { get_sanction_event, post_sanction_event } from "../../api/event_api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export const Event_Approval = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["event_sanction"],
    queryFn: get_sanction_event,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const event = data?.data || [];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleView = (item) => {
    setSelectedEvent(item);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const [actionLoading, setActionLoading] = useState(false);

  const handleAccept = async (id) => {
    try {
      setActionLoading(true);

      const response = await post_sanction_event(id);

      console.log("accept response", response.data);

      if (response.status === 200 || response.status === 201) {
        alert("Event Accepted Successfully ✅");

        closeModal();
      }
    } catch (e) {
      console.error(e?.response?.data || e);

      alert(e?.response?.data?.message || "Failed to accept event ❌");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = () => {
    alert("Event Declined ❌");

    closeModal();
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="EventReport">Event Approval</div>

        <div className="athleteProfileCard">
          <div className="athleteTable">
            <div className="profileHeads">
              <div>Event Name</div>

              <div>Date</div>

              <div>Status</div>

              <div>State / Club</div>

              <div>View</div>
            </div>

            {isLoading && (
              <div className="athleteprofileRows">
                <div>Loading...</div>
              </div>
            )}

            {!isLoading && event.length === 0 && (
              <div className="emptyStateWrapper">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                  alt="No Events"
                  className="emptyStateImage"
                />

                <h3>No Events Found</h3>

                <p>There are no events available.</p>
              </div>
            )}

            {!isLoading &&
              event.map((item, i) => (
                <div className="athleteprofileRows" key={i}>
                  <div className="eventInfoWrap">
                    <div className="eventContent">
                      <h4>{item.event_name}</h4>

                      <p>{item.venue}</p>
                    </div>
                  </div>

                  <div>{item.date}</div>

                  <div>
                    <span
                      className={`statuss ${
                        item.status === "PUBLISHED" ? "accepted" : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div>{item.organizer_name || item.national_name}</div>

                  <div onClick={() => handleView(item)} className="view-btn">
                    View
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="eventModalOverlay">
          <div className="eventViewModal">
            <div className="eventModalTop">
              <h2>Event Details</h2>

              <button className="closeModalBtn" onClick={closeModal}>
                <FiX />
              </button>
            </div>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.event_name}
              className="eventModalImage"
            />

            <div className="eventModalBody">
              <h3>{selectedEvent.event_name}</h3>

              <p className="eventModalDescription">
                {selectedEvent.description}
              </p>

              <div className="eventDetailGrid">
                <div className="eventDetailCard">
                  <span>Venue</span>

                  <h4>{selectedEvent.venue}</h4>
                </div>

                <div className="eventDetailCard">
                  <span>Date</span>

                  <h4>{selectedEvent.date}</h4>
                </div>

                <div className="eventDetailCard">
                  <span>Start Time</span>

                  <h4>{selectedEvent.event_start}</h4>
                </div>

                <div className="eventDetailCard">
                  <span>End Time</span>

                  <h4>{selectedEvent.event_end}</h4>
                </div>

                <div className="eventDetailCard">
                  <span>Organizer</span>

                  <h4>
                    {selectedEvent.organizer_name ||
                      selectedEvent.national_name}
                  </h4>
                </div>

                <div className="eventDetailCard">
                  <span>Status</span>

                  <h4>{selectedEvent.status}</h4>
                </div>
              </div>

              <div className="eventActionBtns">
                <button
                  className="acceptEventBtn"
                  onClick={() => handleAccept(selectedEvent.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Accepting..." : "Accept"}
                </button>

                <button className="declineEventBtn" onClick={handleDecline}>
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
