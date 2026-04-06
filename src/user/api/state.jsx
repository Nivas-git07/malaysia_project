import API from "./axiosmodal";

export const getclublist = (id) => {
  return API.get(`/user/get_state_clubs/?state_id=${id}`);
};

export const get_state_page = (state_id) => {
  return API.get(`/user/get_state_page/?state_id=${state_id}`);
};

