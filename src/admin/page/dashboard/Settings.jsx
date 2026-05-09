import React, { useState, useEffect } from "react";
import { FaCamera, FaUserCircle } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Navbar from "../navbar/nav";

import { getProfile, updateProfile } from "../../api/profile";
import { checksession } from "../../api/home_api";

import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

export default function Settings() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  // SESSION
  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
  });

  const user = sessionData?.data || {};
  const role = user.role;

  // PROFILE
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const rawData = data?.data || {};
  const profile = rawData.profile || rawData;

  console.log("Profile data:", profile);

  // ROLE FIELDS
  const ROLE_FIELDS = {
    // SUPERADMIN ONLY THESE FIELDS
    SUPERADMIN: [
      "full_name",
      "email_id",
      "date_of_birth",
      "gender",
      "headquarters",
      "profile_picture",
    ],

    CLUB: [
      "full_name",
      "email_id",
      "phone_number",
      "date_of_birth",
      "gender",
      "club_name",
      "club_code",
      "club_address",
    ],

    STATE: [
      "full_name",
      "email_id",
      "phone_number",
      "date_of_birth",
      "gender",
    ],

    NATIONAL: [
      "full_name",
      "email_id",
      "phone_number",
      "date_of_birth",
      "gender",
      "headquarters",
      "contact_email",
      "instagram",
      "facebook",
    ],
  };

  // SET FORM DATA
  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        email_id: profile.email_id || "",
        phone_number: profile.phone_number || "",
        date_of_birth: profile.date_of_birth || "",
        gender: profile.gender || "",

        headquarters: profile.headquarters || "",
        contact_email: profile.contact_email || "",
        instagram: profile.instagram || "",
        facebook: profile.facebook || "",

        club_name: profile.details?.club_name || "",
        club_code: profile.details?.club_code || "",
        club_address: profile.details?.club_address || "",

        profile_picture: null,
      });
    }
  }, [profile]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file instanceof File) {
      setForm((prev) => ({
        ...prev,
        profile_picture: file,
      }));

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }

    const [day, month, year] = date.split("-");

    return `${year}-${month}-${day}`;
  };

  // RENDER FIELD
  const renderField = (field) => {
    const props = {
      name: field,
      value: form[field] || "",
      onChange: handleChange,
      className: "athleteProfile__input",
    };

    // EMAIL
    if (field === "email_id" || field === "contact_email") {
      return <input type="email" {...props} />;
    }

    // PHONE
    if (field === "phone_number") {
      return <input type="tel" {...props} />;
    }

    // GENDER
    if (field === "gender") {
      return (
        <select {...props}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      );
    }

    // TEXTAREA
    if (field === "club_address" || field === "headquarters") {
      return <textarea {...props} rows={4} />;
    }

    // DATE
    if (field === "date_of_birth") {
      return <input type="date" {...props} />;
    }

    return <input type="text" {...props} />;
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const fields = ROLE_FIELDS[role] || [];

      fields.forEach((field) => {
        // SKIP PROFILE PICTURE
        if (field === "profile_picture") return;

        let value = form[field];

        // FORMAT DATE
        if (field === "date_of_birth") {
          value = formatDate(value);
        }

        formData.append(field, value || "");
      });

      // PROFILE IMAGE
      if (form.profile_picture instanceof File) {
        formData.append("profile_picture", form.profile_picture);
      }

      // DEBUG
      console.log("Submitting FormData");

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // API CALL
      const res = await updateProfile(formData);

      if (res.status === 200 || res.status === 201) {
        alert("Profile updated successfully ✅");

        queryClient.invalidateQueries(["profile"]);
      }
    } catch (err) {
      console.error("UPDATE ERROR:", err);

      console.error("BACKEND ERROR:", err?.response?.data);

      alert(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Update failed ❌",
      );
    }
  };

  // LOADING
  if (isLoading) {
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
  if (isError) {
    return (
      <>
        <Navbar />

        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load profile"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="athleteProfile__page">

          {/* HEADER */}
          <div className="athleteProfile__header">
            <p className="athleteProfile__smallTitle">
              ACCOUNT MANAGEMENT
            </p>

            <h1 className="athleteProfile__title">
              Profile Settings
            </h1>
          </div>

          <div className="athleteProfile__layout">

            {/* LEFT CARD */}
            <div className="athleteProfile__card">

              {/* PROFILE IMAGE */}
              <div className="athleteProfile__imageWrapper">

                {previewImage ? (
                  <img
                    src={previewImage}
                    className="athleteProfile__image"
                    alt="preview"
                  />
                ) : profile.profile_picture ? (
                  <img
                    src={profile.profile_picture}
                    className="athleteProfile__image"
                    alt="profile"
                  />
                ) : (
                  <FaUserCircle className="athleteProfile__image" />
                )}

                <label className="athleteProfile__cameraIcon">
                  <FaCamera />

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImage}
                  />
                </label>
              </div>

              {/* NAME */}
              <h3 className="athleteProfile__name">
                {form.full_name}
              </h3>

              {/* EMAIL */}
              <p className="athleteProfile__email">
                {form.email_id}
              </p>

              {/* META */}
              <div className="athleteProfile__meta">

                <div className="athleteProfile__metaItem">
                  <p className="athleteProfile__label">
                    STATUS
                  </p>

                  <span className="athleteProfile__status">
                    ACTIVE
                  </span>
                </div>

                <div className="athleteProfile__metaItem">
                  <p className="athleteProfile__label">
                    ROLE
                  </p>

                  <span className="athleteProfile__value">
                    {user.role}
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="athleteProfile__form">

              <h3 className="athleteProfile__formTitle">
                Personal Details
              </h3>

              <div className="athleteProfile__formGrid">

                {(ROLE_FIELDS[role] || []).map((field) => {
                  // HIDE PROFILE_PICTURE FIELD
                  if (field === "profile_picture") return null;

                  return (
                    <div
                      className="athleteProfile__group"
                      key={field}
                    >
                      <label>
                        {field
                          .replaceAll("_", " ")
                          .toUpperCase()}
                      </label>

                      {renderField(field)}
                    </div>
                  );
                })}

              </div>

              {/* SAVE BUTTON */}
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
        </div>
      </div>
    </>
  );
}