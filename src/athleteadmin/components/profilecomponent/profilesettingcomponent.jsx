import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCamera, FaUserCircle } from "react-icons/fa";
import { edit_profile } from "../../api/profile_api";
import { get_profile } from "../../api/profile_api"; // make sure this exists
import SkeletonLoader from "../common/SkeletonLoader";
import ErrorState from "../common/ErrorState";
import AthleteRecords from "./athleterecord";
export default function ProfileSettings() {
  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email_id: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    primary_discipline: "",
    profile_picture: null,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: get_profile,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log("Profile data:", data?.data);

  useEffect(() => {
    if (data?.data) {
      const p = data.data;

      setForm({
        full_name: p.full_name || "",
        email_id: p.email_id || "",
        phone_number: p.phone_number || "",
        date_of_birth: p.date_of_birth || "",
        gender: p.gender || "",
        primary_discipline: p.total_records.primary_discipline || "",
        profile_picture: null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, profile_picture: file });

      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };

 const handleSubmit = async () => {
  try {
    const response = await edit_profile(
      form.full_name,
      form.phone_number,
      form.profile_picture,
      form.email_id,
      form.date_of_birth,
      form.gender,
      form.primary_discipline
    );

    console.log("API Response:", response);

    // ✅ Check status properly
    if (response && (response.status === 200 || response.status === 201)) {
      alert("Profile updated successfully ✅");
    } else {
      alert("Update failed ❌");
    }

  } catch (err) {
    console.error("Error:", err);

    alert(
      err.response?.data?.message ||
      "Update failed ❌ Please try again."
    );
  }
};

  if (isLoading) return <SkeletonLoader variant="card" count={2} />;

  if (isError)
    return (
      <ErrorState
        title="Unable to load profile"
        message="Please check your connection and try again."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="athleteProfile__page">
      <div className="athleteProfile__header">
        <p className="athleteProfile__smallTitle">ACCOUNT MANAGEMENT</p>
        <h1 className="athleteProfile__title">Profile Settings</h1>
      </div>

      <div className="athleteProfile__layout">
        {/* LEFT CARD */}
        <div className="athleteProfile__card">
          <div className="athleteProfile__imageWrapper">
            {previewImage ? (
              <img
                src={previewImage}
                alt="preview"
                className="athleteProfile__image"
              />
            ) : data?.data?.profile_picture ? (
              <img
                src={data.data.profile_picture}
                alt="profile"
                className="athleteProfile__image"
              />
            ) : (
              <FaUserCircle className="athleteProfile__image" />
            )}

            <label className="athleteProfile__cameraIcon">
              <FaCamera />
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          <h3 className="athleteProfile__name">{form.full_name}</h3>
          <p className="athleteProfile__email">{form.email_id}</p>

         

          <div className="athleteProfile__meta">
            <div className="athleteProfile__metaItem">
              <p className="athleteProfile__label">STATUS</p>
              <span className="athleteProfile__status">ACTIVE</span>
            </div>

            <div className="athleteProfile__metaItem">
              <p className="athleteProfile__label">DISCIPLINE</p>
              <span className="athleteProfile__value">
                {form.primary_discipline || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="athleteProfile__form">
          <h3 className="athleteProfile__formTitle">Personal Details</h3>

          <div className="athleteProfile__formGrid">
            <div className="athleteProfile__group">
              <label>FULL NAME</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="athleteProfile__group">
              <label>EMAIL</label>
              <input
                name="email_id"
                value={form.email_id}
                onChange={handleChange}
              />
            </div>
            <div className="athleteProfile__group">
              <label>PHONE</label>
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="athleteProfile__group">
              <label>DATE OF BIRTH</label>
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div className="athleteProfile__group">
              <label>GENDER</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="athleteProfile__group">
              <label>DISCIPLINE</label>

              <select
                name="primary_discipline"
                value={form.primary_discipline || ""}
                onChange={handleChange}
                className="athleteProfile__select"
              >
                <option value="">Select Discipline</option>
                <option value="SURFACE">Surface</option>
                <option value="BI_FINS">Bi-Fins</option>
                <option value="APNEA">Apnea</option>
                <option value="IMMERSION">Immersion</option>
              </select>
            </div>
          </div>

          <div className="athleteProfile__actions">
            <button
              className="athleteProfile__saveBtnPrimary"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        
        </div>
      </div>
        <AthleteRecords/>
    </div>
  );
}
