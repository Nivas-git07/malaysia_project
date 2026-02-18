import API from "./axiosmodal";

export const athelete_register = (full_name, govt_id, email_id, phone_number, role = "ATHELETE", gender, date_of_birth, state, password) =>
    API.post("/athlette_register", { govt_id, email_id, full_name, phone_number, role, gender, date_of_birth, state, password })