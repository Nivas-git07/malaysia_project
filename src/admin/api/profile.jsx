import API from "../../user/api/axiosmodal";

export const getProfile = () => {
    return API.get("/super/get_profile/");
}

export const updateProfile = (full_name, phone_number) => {
    return API.patch("/super/edit_admin_profile/", { full_name, phone_number });
}