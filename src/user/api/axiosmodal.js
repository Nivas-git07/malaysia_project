import axios from "axios";



const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});


API.interceptors.request.use(
  (req) => {
    console.log("REQUEST SENT:", req.url);
    return req;
  },
  (error) => Promise.reject(error)
);



export default API;
