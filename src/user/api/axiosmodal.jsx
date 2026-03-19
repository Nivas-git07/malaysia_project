import axios from "axios";



const API = axios.create({
  baseURL: "https://api.todayworld.in",
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
