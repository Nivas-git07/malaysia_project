import API from "../../user/api/axiosmodal";

export const homeData = () => {
  return API.get("/super/get-admin-home");
}

export const getClubList = () => {
  return API.get("/super/get-club-list/");
}

export const getathleteList = () => {
  return API.get("/super/get-athlete-list/");
}

export const athletedata = (id) => {
  return API.get(`/super/get-athlete-list/?id=${id}`);
}

export const statedata = (id) => {
  return API.get(`/super/get-club-list/?id=${id}`);
}

export const checksession = () => {
  return API.get("/auth/check-session/");
}