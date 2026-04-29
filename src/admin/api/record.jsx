import API from "../../user/api/axiosmodal";

export const geteventRecords = () => {
  return API.get("/super/fetch-tickets/");
};

export const get_athlete_records = () => {
  return API.get("/super/get-athlete-list/?page=athlete-record");
};

export const post_record = (payload) => {
  console.log("API paload",payload)
  return API.post("/super/create-record/",  payload );
};
