import React, { useState } from "react";
import Navbar from "../navbar/nav";
import { get_event_records } from "../../api/event_api";
import { get_athlete_records, post_record } from "../../api/record";
import { useQuery } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";

import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

export default function Record() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [discipline, setdiscipline] = useState("");
  const [date, setdate] = useState("");

  const [rows, setRows] = useState([
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

  // VALIDATION STATES
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // ATHLETES
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

    console.log("THe athlete list",athleteRecords?.data)

  // EVENTS
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

  const records = Array.isArray(eventRecords?.data)
    ? eventRecords.data
    : eventRecords?.data?.events || [];

  // LOADING
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

  // ERROR
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

  // VALIDATION
  const validateForm = () => {
    let newErrors = {};

    // TOP FIELDS
    if (!selectedEvent) {
      newErrors.selectedEvent = "Event is required";
    }

    if (!discipline) {
      newErrors.discipline = "Discipline is required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    // ROWS
    rows.forEach((row, index) => {
      if (!row.full_name) {
        newErrors[`full_name_${index}`] = "Athlete required";
      }

      if (!row.distance) {
        newErrors[`distance_${index}`] = "Distance required";
      }

      if (!row.medal) {
        newErrors[`medal_${index}`] = "Medal required";
      }

      if (!row.rank) {
        newErrors[`rank_${index}`] = "Rank required";
      }

      if (!row.time) {
        newErrors[`time_${index}`] = "Time required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SAVE
  const handleSave = async () => {
    setSubmitError("");

    const isValid = validateForm();

    if (!isValid) {
      setSubmitError("Please fill all required fields properly.");
      return;
    }

    const payload = rows.map((row) => ({
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
        setErrors({});
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

  // ADD ROW
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        distance: "",
        full_name: "",
        state: "",
        medal: "",
        rank: "",
        time: "",
      },
    ]);
  };

  // DELETE ROW
  const handleDeleteRow = (index) => {
    if (index < 3) return;

    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // ATHLETE CHANGE
  const handleAthleteChange = (value, index) => {
    const selected = athleteList.find((a) => a.full_name === value);

    const updated = [...rows];

    updated[index].full_name = value;
    updated[index].state = selected?.state_name || "";

    setRows(updated);

    setErrors((prev) => ({
      ...prev,
      [`full_name_${index}`]: "",
    }));
  };

  // FIELD CHANGE
  const handleChange = (value, index, field) => {
    const updated = [...rows];

    updated[index][field] = value;

    setRows(updated);

    setErrors((prev) => ({
      ...prev,
      [`${field}_${index}`]: "",
    }));
  };

  return (
    <div>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="newsTitle">Record Entry</div>

        <div className="athleteCard">
          {/* FILTERS */}
          <div className="athleteFilters recordFilters">

            {/* EVENT */}
            <div className="filterGroup">
              <label className="filterLabel">Event Name</label>

              <select
                className={`filterSelect ${
                  errors.selectedEvent ? "inputError" : ""
                }`}
                value={selectedEvent}
                onChange={(e) => {
                  const value = e.target.value;

                  setSelectedEvent(value);

                  const selected = records.find(
                    (event) => event.event_name === value,
                  );

                  setSelectedEventId(selected?.id || "");

                  setErrors((prev) => ({
                    ...prev,
                    selectedEvent: "",
                  }));
                }}
              >
                <option value="">Select Event</option>

                {records.map((event) => (
                  <option key={event.id} value={event.event_name}>
                    {event.event_name}
                  </option>
                ))}
              </select>

              {errors.selectedEvent && (
                <p className="errorText">{errors.selectedEvent}</p>
              )}
            </div>

            {/* DISCIPLINE */}
            <div className="filterGroup">
              <label className="filterLabel">Discipline</label>

              <select
                className={`filterSelect ${
                  errors.discipline ? "inputError" : ""
                }`}
                value={discipline}
                onChange={(e) => {
                  setdiscipline(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    discipline: "",
                  }));
                }}
              >
                <option value="">Select Discipline</option>
                <option value="APNEA">Apnea</option>
             
                <option value="BI_FINS">Bi_Fins</option>
                <option value="SURFACE">Surface</option>
                <option value="IMMERSION">Immersion</option>
              </select>

              {errors.discipline && (
                <p className="errorText">{errors.discipline}</p>
              )}
            </div>

            {/* DATE */}
            <div className="filterGroup">
              <label className="filterLabel">Date</label>

              <input
                type="date"
                className={`filterSelect ${
                  errors.date ? "inputError" : ""
                }`}
                value={date}
                onChange={(e) => {
                  setdate(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    date: "",
                  }));
                }}
              />

              {errors.date && (
                <p className="errorText">{errors.date}</p>
              )}
            </div>

            {/* ADD ROW */}
            <button className="findBtn addRowBtn" onClick={handleAddRow}>
              Add Row
            </button>
          </div>

          {/* TABLE */}
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

                {/* S.NO */}
                <div>{i + 1}</div>

                {/* ATHLETE */}
                <div>
                  <select
                    className={`tableSelect ${
                      errors[`full_name_${i}`] ? "inputError" : ""
                    }`}
                    value={item.full_name}
                    onChange={(e) =>
                      handleAthleteChange(e.target.value, i)
                    }
                  >
                    <option value="">Select Athlete</option>

                    {athleteList.map((athlete) => (
                      <option
                        key={athlete.id}
                        value={athlete.full_name}
                      >
                        {athlete.full_name}
                      </option>
                    ))}
                  </select>

                  {errors[`full_name_${i}`] && (
                    <p className="errorText">
                      {errors[`full_name_${i}`]}
                    </p>
                  )}
                </div>

                {/* DISTANCE */}
                <div>
                  <input
                    type="text"
                    placeholder="Distance"
                    className={`tableInput ${
                      errors[`distance_${i}`] ? "inputError" : ""
                    }`}
                    value={item.distance}
                    onChange={(e) =>
                      handleChange(e.target.value, i, "distance")
                    }
                  />

                  {errors[`distance_${i}`] && (
                    <p className="errorText">
                      {errors[`distance_${i}`]}
                    </p>
                  )}
                </div>

                {/* MEDAL */}
                <div>
                  <select
                    className={`tableSelect ${
                      errors[`medal_${i}`] ? "inputError" : ""
                    }`}
                    value={item.medal}
                    onChange={(e) =>
                      handleChange(e.target.value, i, "medal")
                    }
                  >
                    <option value="">Select</option>
                    <option value="gold">🥇 Gold</option>
                    <option value="silver">🥈 Silver</option>
                    <option value="bronze">🥉 Bronze</option>
                  </select>

                  {errors[`medal_${i}`] && (
                    <p className="errorText">
                      {errors[`medal_${i}`]}
                    </p>
                  )}
                </div>

                {/* RANK */}
                <div>
                  <select
                    className={`tableSelect ${
                      errors[`rank_${i}`] ? "inputError" : ""
                    }`}
                    value={item.rank}
                    onChange={(e) =>
                      handleChange(e.target.value, i, "rank")
                    }
                  >
                    <option value="">Rank</option>

                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  {errors[`rank_${i}`] && (
                    <p className="errorText">
                      {errors[`rank_${i}`]}
                    </p>
                  )}
                </div>

                {/* TIME */}
                <div>
                  <input
                    type="time"
                    step="1"
                    placeholder="00:00:00"
                    className={`tableInput ${
                      errors[`time_${i}`] ? "inputError" : ""
                    }`}
                    value={item.time}
                    onChange={(e) =>
                      handleChange(e.target.value, i, "time")
                    }
                  />

                  {errors[`time_${i}`] && (
                    <p className="errorText">
                      {errors[`time_${i}`]}
                    </p>
                  )}
                </div>

                {/* DELETE */}
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

            {/* GLOBAL ERROR */}
            {submitError && (
              <div className="submitErrorBox">
                {submitError}
              </div>
            )}

            {/* FOOTER */}
            <div className="tableFooter recordFooter">
              <button
                className="saveRecordBtn"
                onClick={handleSave}
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