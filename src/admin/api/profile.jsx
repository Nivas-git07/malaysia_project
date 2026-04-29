import API from "../../user/api/axiosmodal";

export const getProfile = () => {
    return API.get("/super/get-profile/");
}

export const updateProfile = (formData) => {
    return API.patch("/super/edit-admin-profile/", formData);
}