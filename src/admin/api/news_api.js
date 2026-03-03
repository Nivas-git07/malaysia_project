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
   
