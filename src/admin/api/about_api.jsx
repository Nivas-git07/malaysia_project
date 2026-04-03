import API from "../../user/api/axiosmodal";

export const editabout = (payload) => {
  return API.patch("/super/update_about_content/", payload);
};

export const getabout = () => {
  return API.get("/super/get_about_content/");
}