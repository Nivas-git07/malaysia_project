import API from "./axiosmodal";

export const getclubpage = async (clubId) => {
  return API.get(`/user/get_club_page/?club_id=${clubId}`);
};

export const getclubabout = async (clubId) => {
  return API.get(`/user/get_about_page/?club_id=${clubId}`);
};
