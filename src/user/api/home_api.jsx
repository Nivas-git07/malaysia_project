import API from "./axiosmodal";

export const get_home_data = () => {
    return API.get("/auth/check_session/");
}