import React, { useState } from "react";
import Navbar from "../navbar/nav";
import { get_event_records } from "../../api/event_api";
import { get_athlete_records } from "../../api/record";
import { useQuery } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";
import { post_record } from "../../api/record";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
export default function Record() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [discipline, setdiscipline] = useState("");
  const [date, setdate] = useState("");
  const [rows, setRows] = useState([
    { distance: "", full_name: "", state: "", medal: "", rank: "", time: "" },
    { distance: "", full_name: "", state: "", medal: "", rank: "", time: "" },
    { distance: "", full_name: "", state: "", medal: "", rank: "", time: "" },
  ]);
  const {
    data: athleteRecords,
    isLoading: isAthleteLoading,
    error: athleteError,
    refetch: refetchAthletes,
  } = useQuery({
    queryKey: ["athleteRecords"],
    queryFn: get_athlete_records,
    retry: false,
  });

  const athleteList = Array.isArray(athleteRecords?.data?.athletes_list)
    ? athleteRecords.data.athletes_list
    : [];
    console.log(athleteList)

  // const athleteList = athleteRecords?.data?.athletes_list || [];

  const {
    data: eventRecords,
    isLoading: isEventLoading,
    error: eventError,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["eventRecords"],
    queryFn: get_event_records,
    retry: false,
  });
  console.log("event", eventRecords?.data);
  const records = Array.isArray(eventRecords?.data)
    ? eventRecords.data
    : eventRecords?.data?.events || [];
  console.log(records);

  if (isAthleteLoading || isEventLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={2} />
        </div>
      </>
    );
  }

  if (athleteError || eventError) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load record form"
            message="Please check your connection and try again."
            onRetry={() => {
              refetchAthletes();
              refetchEvents();
            }}
          />
        </div>
      </>
    );
  }
  const handleSave = async () => {
    const filteredRows = rows.filter(
      (row) => row.full_name && row.distance && row.time,
    );

    const payload = filteredRows.map((row) => ({
      athlete: athleteList.find((a) => a.full_name === row.full_name)?.id,
      event: selectedEventId,
      discipline: discipline,
      distance: row.distance,
      best_time: row.time,
      medal: row.medal?.toUpperCase(),
      rank:
        row.rank === "1"
          ? "First"
          : row.rank === "2"
            ? "Second"
            : row.rank === "3"
              ? "Third"
              : row.rank,
      date: date,
    }));

   try {
  const res = await post_record(payload);

  // ✅ SUCCESS CHECK
  if (res?.status === 200 || res?.status === 201) {
    alert("Record saved successfully ✅");

    setRows([
      {
        distance: "",
        full_name: "",
        state: "",
        medal: "",
        rank: "",
        time: "",
      },
      {
        distance: "",
        full_name: "",
        state: "",
        medal: "",
        rank: "",
        time: "",
      },
      {
        distance: "",
        full_name: "",
        state: "",
        medal: "",
        rank: "",
        time: "",
      },
    ]);

    setSelectedEvent("");
    setSelectedEventId("");
    setdiscipline("");
    setdate("");
  } else {
  
    alert("Failed to save record ❌");
  }

} catch (err) {
  console.error(err);
  const errorMsg =
    err?.response?.data?.message ||
    err?.response?.data?.detail ||
    "Something went wrong ❌";

  alert(errorMsg);
}
  };

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { full_name: "", state: "", medal: "", rank: "", time: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    if (index < 3) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAthleteChange = (value, index) => {
    const selected = athleteList.find((a) => a.full_name === value);

    const updated = [...rows];
    updated[index].full_name = value;
    updated[index].state = selected?.state_name || "";
    setRows(updated);
  };

  const handleChange = (value, index, field) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="newsTitle">Record Entry</div>

        <div className="athleteCard">
          <div className="athleteFilters recordFilters">
            <div className="filterGroup">
              <label className="filterLabel">Event Name</label>
              <select
                className="filterSelect"
                value={selectedEvent}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedEvent(value);

                  const selected = records.find(
                    (event) => event.event_name === value,
                  );

                  setSelectedEventId(selected?.id || "");
                }}
              >
                <option value="">Select Event</option>
                {records.map((event) => (
                  <option key={event.id} value={event.event_name}>
                    {event.event_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Discipline</label>
              <select
                className="filterSelect"
                value={discipline}
                onChange={(e) => {
                  setdiscipline(e.target.value);
                }}
              >
                <option value="">Select Discipline</option>
                <option value="freestyle">Freestyle</option>
                <option value="butterfly">Butterfly</option>
                <option value="backstroke">Backstroke</option>
                <option value="SURFACE">surface</option>
                <option value="breaststroke">Breaststroke</option>
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Date</label>
              <input
                type="date"
                className="filterSelect"
                value={date}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
            </div>

            <button className="findBtn addRowBtn" onClick={handleAddRow}>
              Add Row
            </button>
          </div>

          <div className="athleteTable">
            <div className="athleteHead">
              <div>S.No</div>
              <div>Athlete Name</div>
              <div>Distance</div>
              <div>Medal</div>
              <div>Rank</div>
              <div>Record / Time</div>
              <div>Action</div>
            </div>

            {rows.map((item, i) => (
              <div className="athleteRow recordRow" key={i}>
                <div>{i + 1}</div>

                <div>
                  <select
                    className="tableSelect"
                    value={item.full_name}
                    onChange={(e) => handleAthleteChange(e.target.value, i)}
                  >
                    <option value="">Select Athlete</option>
                    {athleteList.map((athlete) => (
                      <option key={athlete.id} value={athlete.full_name}>
                        {athlete.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Distance"
                    className="tableInput"
                    value={item.distance}
                    onChange={(e) =>
                      handleChange(e.target.value, i, "distance")
                    }
                  />
                </div>

                {/* Medal */}
                <div>
                  <select
                    className="tableSelect"
                    value={item.medal}
                    onChange={(e) => handleChange(e.target.value, i, "medal")}
                  >
                    <option value="">Select</option>
                    <option value="gold">🥇 Gold</option>
                    <option value="silver">🥈 Silver</option>
                    <option value="bronze">🥉 Bronze</option>
                  </select>
                </div>

                {/* Rank */}
                <div>
                  <select
                    className="tableSelect"
                    value={item.rank}
                    onChange={(e) => handleChange(e.target.value, i, "rank")}
                  >
                    <option value="">Rank</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Time */}
                <div>
                  <input
                    type="time"
                    step="1"
                    placeholder="00:00:00"
                    className="tableInput"
                    value={item.time}
                    onChange={(e) => handleChange(e.target.value, i, "time")}
                  />
                </div>

                {/* Delete */}
                <div>
                  {i >= 3 && (
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteRow(i)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {/* FOOTER */}
            <div className="tableFooter recordFooter">
              <button
                className="saveRecordBtn"
                onClick={() => {
                  handleSave();
                }}
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
