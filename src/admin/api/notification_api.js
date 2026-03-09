import API from "../../user/api/axiosmodal";

export const getNotifications = async () => {
    return API.get("/super/get_notifications/");
}