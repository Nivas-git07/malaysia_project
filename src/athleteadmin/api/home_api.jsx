import API from "../../user/api/axiosmodal";

export const get_dashboard_data = () => {
  return API.get("/super/get-athlete-dashboard/");
};
