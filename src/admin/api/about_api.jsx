import API from "../../user/api/axiosmodal";

export const editabout = (formData) => {
  return API.patch("/super/update_about_content/", { formData });
};
