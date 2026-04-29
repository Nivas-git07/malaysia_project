import API from "../../user/api/axiosmodal";

export const postnews = (formData) => {
  return API.post("/super/post-news/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getnews = () => {
  return API.get("/super/fetch-all-news/");
};

export const fetct_one_news = (id) => {
  return API.get(`/super/fetch-one-news/?id=${id}`);
};

export const editnews = (id, formData) => {
  return API.patch(`/super/edit-news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postgallery = (formData) => {
  return API.post("/super/add-gallery-images/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const get_recent_gallery = () => {
  return API.get("/super/get-all-images/");
};

export const deletegallery = (id) => {
  return API.delete(`/super/gallery/${id}/`);
};

export const delete_news = (id) => {
  return API.delete(`/super/delete-event-or-news/?news_id=${id}`);
};
