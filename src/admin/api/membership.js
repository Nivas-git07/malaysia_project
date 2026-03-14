import API from "../../user/api/axiosmodal";

export const getmebership = () => {
  return API.get("/super/get_membership_list/");
}

export const getmebershipdetails = (id) => {
  return API.get(`/super/get_membership_data/?id=${id}`);
}