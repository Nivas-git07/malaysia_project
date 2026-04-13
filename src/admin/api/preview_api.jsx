import API from "../../user/api/axiosmodal";

export const post_about_preview = (about, mission, vision) => {
  return API.post("/super/get-preview/", { about, mission, vision });
};
