import API from "../../user/api/axiosmodal";

export const postnews = (title, description, content, image, visibility, status) => {
  return API.post("/admin/postnews/", {
    title,
    description,
    content,
    image,
    visibility,
    status
  });
}