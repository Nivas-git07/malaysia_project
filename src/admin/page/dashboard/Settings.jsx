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

  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
  });

  const user = sessionData?.data || {};

  const getNormalizedRole = (role) => {
    if (role === "SUPERADMIN") return "NATIONAL";
    return role;
  };

  const role = getNormalizedRole(user.role);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const rawData = data?.data || {};
  const profile = rawData.profile || rawData;
  console.log("Profile data:", profile);

  const ROLE_FIELDS = {
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
    STATE: ["full_name", "email_id", "phone_number", "date_of_birth", "gender"],
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file instanceof File) {
      setForm((prev) => ({ ...prev, profile_picture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const renderField = (field) => {
    const props = {
      name: field,
      value: form[field] || "",
      onChange: handleChange,
    };

    if (field === "email_id") return <input {...props} r />;

    if (field === "gender") {
      return (
        <select {...props}>
          <option value="">Select</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      );
    }

    if (field === "club_address" || field === "headquarters") {
      return <textarea {...props} />;
    }

    if (field === "date_of_birth") {
      return <input type="date" {...props} />;
    }

    return <input {...props} />;
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const fields = ROLE_FIELDS[role] || [];

      fields.forEach((field) => {
        let value = form[field];

        if (field === "date_of_birth") value = formatDate(value);

        if (value !== undefined && value !== null && value !== "") {
          formData.append(field, value);
        }
      });

      if (form.profile_picture instanceof File) {
        formData.append("profile_picture", form.profile_picture);
      }
      console.log("Submitting:", Object.fromEntries(formData));

      const res = await updateProfile(formData);

      if (res.status === 200 || res.status === 201) {
        alert("Profile updated successfully ✅");
        queryClient.invalidateQueries(["profile"]);
      }
    } catch (err) {
      console.error(err.response?.data);
      alert("Update failed ❌");
    }
  };

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={2} />
        </div>
      </>
    );

  if (isError)
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

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="athleteProfile__page">
          <div className="athleteProfile__header">
            <p className="athleteProfile__smallTitle">ACCOUNT MANAGEMENT</p>
            <h1 className="athleteProfile__title">Profile Settings</h1>
          </div>

          <div className="athleteProfile__layout">
            <div className="athleteProfile__card">
              <div className="athleteProfile__imageWrapper">
                {previewImage ? (
                  <img src={previewImage} className="athleteProfile__image" />
                ) : profile.profile_picture ? (
                  <img
                    src={profile.profile_picture}
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
                  <p className="athleteProfile__label">ROLE</p>
                  <span className="athleteProfile__value">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="athleteProfile__form">
              <h3 className="athleteProfile__formTitle">Personal Details</h3>

              <div className="athleteProfile__formGrid">
                {(ROLE_FIELDS[role] || []).map((field) => (
                  <div className="athleteProfile__group" key={field}>
                    <label>{field.replaceAll("_", " ").toUpperCase()}</label>
                    {renderField(field)}
                  </div>
                ))}
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
        </div>
      </div>
    </>
  );
}
