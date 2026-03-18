import API from "../../user/api/axiosmodal";

export const geteventRecords = () => {
    return API.get("/super/fetch_tickets/");
}