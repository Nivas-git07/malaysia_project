import API from "../../user/api/axiosmodal";

export const getEvents = () => {
  return API.get("/super/fetch_all_events/");
}

export const postevent = (formData) => {
  return API.post("/super/post_event/", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
  });
}