import API from "../../user/api/axiosmodal";

export const getAthletes = () => {
  return API.get("/super/get-athlete-list/");
};

export const get_athlete_particular_list = (id) => {
  return API.get(`/super/fetch-athlete-profile/?id=${id}`);
};
