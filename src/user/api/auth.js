import API from "./axiosmodal";

export const athelete_register = (full_name, govt_id, email_id, phone_number, role = "ATHELETE", gender, date_of_birth, state, password) =>
    API.post("auth/athlette_register", { govt_id, email_id, full_name, phone_number, role, gender, date_of_birth, state, password })

export const club_register = (email_id, password, full_name, phone_number, state, club_name, club_code, club_address) =>
    API.post("auth/club_register", { email_id, password, full_name, phone_number, state, club_name, club_code, club_address })

export const login_user = (govt_id,email_id,password) =>
    API.post("auth/login" , {govt_id,email_id,password})