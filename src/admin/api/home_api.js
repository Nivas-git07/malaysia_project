import API from "../../user/api/axiosmodal";

export const homeData = () => {
  return API.get("/super/get_admin_home");
}