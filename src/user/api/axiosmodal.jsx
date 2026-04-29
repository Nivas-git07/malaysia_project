import axios from "axios";
import { AUTH_EVENTS } from "../../auth/session";



const API = axios.create({
  baseURL: "https://api.todayworld.in",
  // baseURL: "http://localhost:8000",
  withCredentials: true,
});


API.interceptors.request.use(
  (req) => {
    console.log("REQUEST SENT:", req.url);
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_EVENTS.FORCE_LOGOUT));
    }
    return Promise.reject(error);
  },
);



export default API;
