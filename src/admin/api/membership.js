import API from "../../user/api/axiosmodal";

export const getmebership = () => {
  return API.get("/super/get_membership_list/");
}

export const getmebershipdetails = (id) => {
  return API.get(`/super/get_membership_data/?id=${id}`);
}

export const approvemembership = (id, status) => {
  return API.patch(`/super/set_status/?id=${id}`, { status })
}

export const rejectmembership = (id, status, rejection_note) => {
  return API.patch(`/super/set_status/?id=${id}`, { status, rejection_note })
}