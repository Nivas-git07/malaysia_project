import API from "./axiosmodal";

export const getclublist = (id) => {
  return API.get(`/user/get-state-clubs/?state_id=${id}`);
};

export const get_state_page = (state_id) => {
  return API.get(`/user/get-state-page/?state_id=${state_id}`);
};

