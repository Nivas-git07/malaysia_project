import API from "./axiosmodal";

export const get_home_data = () => {
    return API.get("/auth/check_session/");
}

export const get_home = () =>{
    return API.get("/user/get_home_page/")
}

