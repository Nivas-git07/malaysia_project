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

export const postgallery = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return API.post("/super/add-gallery-images/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const get_recent_gallery = () =>{
  return API.get("/super/get-latest-images/")
}