import API from "../../user/api/axiosmodal";

export const getTickets = () => {
  return API.get("/super/fetch-tickets/");
};

export const responst_ticket = (id, payload) => {
  console.log("responst_ticket request", id, payload);
  return API.patch(`/super/respond-to-ticket/?ticket_id=${id}`, payload);
};

export const raise_ticket = (payload) => {
  return API.post("/super/raise-ticket/", payload);
};

export const get_my_ticket = () => {
  return API.get("/super/get-my-tickets/");
};
