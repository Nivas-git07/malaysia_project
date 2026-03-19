import API from "../../user/api/axiosmodal";

export const geteventRecords = () => {
  return API.get("/super/fetch_tickets/");
};

export const get_athlete_records = () => {
  return API.get("/super/get_athlete_list/?page=athlete_record");
};
