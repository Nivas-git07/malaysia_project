import API from "../../user/api/axiosmodal";

export const get_all_register_events = () => {
  return API.get("/super/get-registered-events/");
};
