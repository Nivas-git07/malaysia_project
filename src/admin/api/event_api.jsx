import API from "../../user/api/axiosmodal";

export const getEvents = () => {
  return API.get("/super/fetch-all-events/");
};

export const postevent = (formData) => {
  return API.post("/super/post-event/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetct_one_event = (id) => {
  return API.get(`/super/fetch-one-event/?id=${id}`);
};

export const editevent = (id, formData) => {
  return API.patch(`/super/edit-event/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const get_event_records = () => {
  return API.get("/super/get-events/");
};

export const delete_event = (id) => {
  return API.delete(`/super/delete-event-or-news/?event_id${id}`);
};
