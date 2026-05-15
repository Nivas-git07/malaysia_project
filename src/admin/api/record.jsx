import API from "../../user/api/axiosmodal";

export const geteventRecords = () => {
  return API.get("/super/fetch-tickets/");
};

export const get_athlete_records = () => {
  return API.get("/super/get-athlete-list/?page=athlete-record");
};

export const post_record = (payload) => {
  console.log("API paload", payload);
  return API.post("/super/create-record/", payload);
};

export const get_logs = () => {
  return API.get("/super/get-logs/");
};

export const get_particuler_logs = (category) => {
  return API.get(`/super/get-logs/?category=${category}`);
};

export const get_date_logs = (from, to, page = 1) => {
  return API.get(
    `/super/get-logs/?from_date=${from}&to_date=${to}&page=${page}`,
  );
};

export const get_full_logs = () => {
  return API.get(`/super/get-full-logs/`);
};

export const get_full_category_logs = (category) => {
  return API.get(`super/get-full-logs/?category=${category}`);
};

export const get_full_date_logs = (from, to) => {
  return API.get(`/super/get-full-logs/?from_date=${from}&to_date=${end}`);
};

export const get_log_page = (page) => {
  return API.get(`/super/get-logs/?page=${page}`);
};
