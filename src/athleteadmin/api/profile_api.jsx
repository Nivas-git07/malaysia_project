import API from "../../user/api/axiosmodal";

export const edit_profile = (
  full_name,
  phone_number,
  profile_picture,
  email_id,
  date_of_birth,
  gender,
  primary_discipline
) => {
  const formData = new FormData();

  formData.append("full_name", full_name);
  formData.append("phone_number", phone_number);
  formData.append("email_id", email_id);
  formData.append("date_of_birth", date_of_birth);
  formData.append("gender", gender);
  formData.append("primary_discipline", primary_discipline);

  if (profile_picture) {
    formData.append("profile_picture", profile_picture);
  }

  return API.patch("/super/edit-admin-profile/", formData);
};
export const get_profile = () => {
  return API.get("/super/get-profile/");
};
