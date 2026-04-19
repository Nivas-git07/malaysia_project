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
  primary_discipline,
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
    primary_discipline,
  );

  return API.post("/auth/athlette-register/", {
    gov_id,
    email_id,
    full_name,
    phone_number,
    role,
    gender,
    date_of_birth,
    state,
    password,
    primary_discipline,
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

  return API.post("/auth/club-register/", {
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
  return API.get("/user/get-all-states/");
};

export const membrship_purchase = (formdata) => {
  console.log("Membership Data:", formdata);
  return API.post("/user/purchase-membership/", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const athletemembership_purchase = (formdata, state) => {
  console.log("Athlete Membership Data:", formdata);
  return API.post(
    `/user/purchase-membership/?user_state_id=${state}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const login_user = (gov_id, email_id, password) => {
  console.log(gov_id, email_id, password);
  return API.post("/auth/login/", { gov_id, email_id, password });
};
