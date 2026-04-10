import API from "../../user/api/axiosmodal";

export const editabout = (payload) => {
  return API.patch("/super/update-about-content/", payload);
};

export const getabout = () => {
  return API.get("/super/get-about-content/");
}