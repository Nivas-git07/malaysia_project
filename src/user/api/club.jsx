import API from "./axiosmodal";

export const getclubpage = async (clubId) => {
  return API.get(`/user/get-club-page/?club_id=${clubId}`);
};

export const getclubabout = async ({ clubId, stateId }) => {
  console.log(
    "Fetching about page with clubId:",
    clubId,
    "and stateId:",
    stateId,
  );
  if (clubId) {
    return API.get(`/user/get-about-page/?club_id=${clubId}`);
  }

  if (stateId) {
    return API.get(`/user/get-about-page/?state_id=${stateId}`);
  }

  return API.get(`/user/get-about-page/`);
};

export const getclubathlete = (clubId) => {
  return API.get(`/user/athletes-list/?club_id=${clubId}`);
};

export const getclublist = (state_id) => {
  return API.get(`/user/get-clubs-list/?state_id=${state_id}`);
};
