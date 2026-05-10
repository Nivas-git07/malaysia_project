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
    return API.get(`/user/get-all-news/?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get-all-news/?state_id=${stateId}`);
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

export const get_bestrecords = ({ clubId, stateId }) => {
  if (clubId) {
    return API.get(`/user/get-all-best_records/?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get-all-best_records/?state_id=${stateId}`);
  }

  return API.get("/user/get-all-best_records/?flag=direct_under_national");
};

export const get_content = (params) => {
  console.log("the params is", params);
  return API.get("/user/get-content/", {
    params,
  });
};

export const fetch_one_news = async (id) => {
  console.log("the news id is", id);

  const response = await API.get(`/user/get-single-data/?news_id=${id}`);

  console.log("API RESPONSE", response);

  return response;
};

export const get_athlete_profile = (id) => {
  return API.get(`/user/get-athlete-details/?athlete_id=${id}`);
};
