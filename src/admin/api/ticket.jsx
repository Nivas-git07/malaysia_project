import API from "../../user/api/axiosmodal";

export const getTickets = () => {
  return API.get("/super/fetch-tickets/");
}