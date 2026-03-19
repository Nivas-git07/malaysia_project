import API from "../../user/api/axiosmodal";

export const getAthletes = () => {
  return API.get("/super/get_athlete_list/");
};

export const get_athlete_particular_list = (id) => {
  return API.get(`/super/fetch_athlete_profile/?id=${id}`);
};
