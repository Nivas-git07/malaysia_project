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

export const fetct_one_event = (id) => {
  return API.get(`/super/fetch_one_event/?id=${id}`);
}

export const editevent = (id, formData) => {
  return API.patch(`/super/edit_event/${id}`, formData, {
    headers: {  
      "Content-Type": "multipart/form-data"
    }
  });
} 

export const get_event_records = () => {
  return API.get("/super/get_events/");
}