import API from "./axiosmodal";

export const getallevents = () => {
  return API.get("/user/get_all_events/");
};

export const getevents = ({ stateId, clubId }) => {
  if (clubId) {
    return API.get(`/user/get_club_events/?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get_state_events/?state_id=${stateId}`);
  }
};
