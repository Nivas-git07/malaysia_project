import API from "../../user/api/axiosmodal";

export const postnews = (formData) => {
  return API.post("/super/post_news/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const getnews = () => {
  return API.get("/super/fetch_all_news/");
}
   
export const fetct_one_news = (id) => {
  return API.get(`/super/fetch_one_news/?id=${id}`);
}

export const editnews = (id, formData) => {
  return API.patch(`/super/edit_news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
} 
