import API from "./axiosmodal";

export const getallevents = () => {
  return API.get("/user/get_all_events/");
};
