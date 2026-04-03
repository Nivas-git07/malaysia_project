import API from "./axiosmodal";

export const getclubpage = async (clubId) => {
  return API.get(`/user/get_club_page/?club_id=${clubId}`);
};

export const getclubabout = async ({ clubId, stateId }) => {
  console.log("Fetching about page with clubId:", clubId, "and stateId:", stateId);
  if (clubId) {
    return API.get(`/user/get_about_page/?club_id=${clubId}`);
  }

  if (stateId) {
    return API.get(`/user/get_about_page/?state_id=${stateId}`);
  }

  throw new Error("No ID provided");
};