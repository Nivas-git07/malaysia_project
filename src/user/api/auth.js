import API from "./axiosmodal";

export const athelete_register = (govt_id, email_id, full_name, phone_number, role, gender, date_of_birth, password) =>
    API.post("/athlette_register", { govt_id, email_id, full_name, phone_number, role, gender, date_of_birth, password })