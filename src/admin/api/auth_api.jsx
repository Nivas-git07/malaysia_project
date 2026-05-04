import API from "../../user/api/axiosmodal";

export const adminLogin = (email_id, password) => {
  console.log(email_id, password);
  return API.post("/auth/login/", { email_id, password });
};

export const state_register = (state_name, email_id, password) => {
  return API.post("/auth/state-register/", { state_name, email_id, password });
};
export const staff_register = (email_id, password) => {
  return API.post("/auth/staff-register/", { email_id, password });
};

export const get_staffs = () => {
  return API.get("/super/get-staffs/");
};

export const access_permission = (staff_id, payload) => {
  return API.patch(
    `/super/set-staff-permissions/?staff_id=${staff_id}`,
    payload,
  );
};
export const get_permission = () => {
  return API.get("/auth/check-staff-permissions/");
};
export const get_staff_permission = (staff_id) => {
  return API.get(`/super/get-staff-permissions/?staff_id=${staff_id}`);
};
export const logout = () => {
  return API.post("/auth/logout/");
};
