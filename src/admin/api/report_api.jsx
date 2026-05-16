import API from "../../user/api/axiosmodal";

export const getReport = (params = {}) => {
  return API.get("/super/reports/", {
    params,
  });
};
