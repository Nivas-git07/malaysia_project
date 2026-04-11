import API from "./axiosmodal";

export const get_check = () => {
  return API.get("/auth/check-session/");
};

export const get_home = () => {
  return API.get("/user/get-home-page/");
};

export const raise_tiket = (payload) => {
  console.log("Raising ticket with payload:", payload);
  return API.post("/super/raise-ticket/", payload);
};

export const get_news = () => {
  return API.get("/user/get-all-news/");
};

export const get_particular_news = ({ clubId, stateId }) => {
  if (clubId) {
    return API.get(`/user/get-club-news/?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get-state-news/?state_id=${stateId}`);
  }
};

export const get_gallery = () => {
  return API.get("/user/get-gaallery-images/");
};

export const get_particular_gallery = ({ clubId, stateId }) => {
  if (clubId) {
    return API.get(`/user/get-gaallery-images/?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get-gaallery-images/?state_id=${stateId}`);
  }
};
