import API from "./axiosmodal";

export const athelete_register = (
  full_name,
  gov_id,
  email_id,
  phone_number,
  role,
  gender,
  date_of_birth,
  state,
  password,
) => {
  console.log(
    full_name,
    gov_id,
    email_id,
    phone_number,
    role,
    gender,
    date_of_birth,
    state,
    password,
  );

  return API.post("/auth/athlette_register/", {
    gov_id,
    email_id,
    full_name,
    phone_number,
    role,
    gender,
    date_of_birth,
    state,
    password,
  });
};

export const club_register = (
  email_id,
  password,
  full_name,
  phone_number,
  state,
  club_name,
  club_code,
  club_address,
  about,
  vision,
  mission,
) => {
  console.log(
    email_id,
    password,
    full_name,
    phone_number,
    state,
    club_name,
    club_code,
    club_address,
    about,
    vision,
    mission,
  );

  return API.post("/auth/club_register/", {
    email_id,
    password,
    full_name,
    phone_number,
    state,
    club_name,
    club_code,
    club_address,
    about,
    vision,
    mission,
  });
};

export const get_state = () => {
  return API.get("/user/get_all_states/");
};

export const login_user = (gov_id, email_id, password) => {
  console.log(gov_id, email_id, password);
  return API.post("/auth/login/", { gov_id, email_id, password });
};
