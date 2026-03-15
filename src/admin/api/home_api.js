import API from "../../user/api/axiosmodal";

export const homeData = () => {
  return API.get("/super/get_admin_home");
}
export const statedata = (id) => {
  return API.get(`/super/get_club_list/?id=${id}`);
}

export const checksession = () => {
  return API.get("/auth/check_session/");
}