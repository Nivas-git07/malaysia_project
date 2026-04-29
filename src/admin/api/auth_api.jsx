import API from "../../user/api/axiosmodal";

export const adminLogin = (email_id, password) => {
  console.log(email_id, password);
  return API.post("/auth/login/", { email_id, password });
};

export const state_register = (state_name, email_id, password) => {
  return API.post("/auth/state-register/", { state_name, email_id, password });
};

export const logout = () => {
  return API.post("/auth/logout/");
};
