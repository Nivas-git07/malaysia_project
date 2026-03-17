import API from "../../user/api/axiosmodal";


export const getAthletes = () => {
  return API.get("/super/get_athlete_list/");
}
