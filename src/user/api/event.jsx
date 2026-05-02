import API from "./axiosmodal";

export const getallevents = () => {
  return API.get("/user/get-all-events/");
};

export const getevents = ({ stateId, clubId }) => {
  if (clubId) {
    return API.get(`/user/get-all-events//?club_id=${clubId}`);
  }
  if (stateId) {
    return API.get(`/user/get-all-events/?state_id=${stateId}`);
  }
};

export const geteventdetails = (eventId) => {
  return API.get(`/user/get-single-data/?event_id=${eventId}`);
};

export const eventregister = (eventId) => {
  return API.post(`/super/register-in-event/?event_id=${eventId}`);
};
