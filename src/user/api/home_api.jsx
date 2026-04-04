import API from "./axiosmodal";

export const get_home_data = () => {
  return API.get("/auth/check_session/");
};

export const get_home = () => {
  return API.get("/user/get_home_page/");
};

export const raise_tiket = (payload) => {
  console.log("Raising ticket with payload:", payload);
  return API.post("/super/raise_ticket/", payload);
};

export const get_news = () => {
  return API.get("/user/get_all_news/");
};
