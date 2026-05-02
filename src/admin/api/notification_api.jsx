import API from "../../user/api/axiosmodal";

export const getNotifications = async () => {
    return API.get("/super/get-notifications/");
}

export const notification_count = async () => {
    return API.get("/super/notifications-count/");
}

