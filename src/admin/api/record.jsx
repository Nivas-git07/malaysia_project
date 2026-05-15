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

export const get_logs = async ({
  page = 1,
  category = null,
  from_date = null,
  to_date = null,
  time_range = null,
} = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);

  if (category && category !== "ALL") {
    params.append("category", category);
  }

  if (from_date) {
    params.append("from_date", from_date);
  }

  if (to_date) {
    params.append("to_date", to_date);
  }

  if (time_range) {
    params.append("time_range", time_range);
  }

  return API.get(`/super/get-logs/?${params.toString()}`);
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
