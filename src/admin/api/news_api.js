import API from "../../user/api/axiosmodal";

export const postnews = (formData) => {
  return API.post("/admin/post_news/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
   
