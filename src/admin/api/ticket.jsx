import API from "../../user/api/axiosmodal";

export const getTickets = () => {
  return API.get("/super/fetch-tickets/");
};

export const responst_ticket = (id,payload) => {
  console.log("responst_ticket request",id,payload)
  return API.patch(`/super/respond-to-ticket/?ticket_id=${id}`, payload);
};
