import axios from "axios";



const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});


API.interceptors.request.use(
  (req) => {
    console.log("REQUEST SENT:", req.url);
    return req;
  },
  (error) => Promise.reject(error)
);



// API.interceptors.response.use(
//   (res) => {
//     console.log("RESPONSE RECEIVED:", res.status);
//     return res;
//   },
//   (error) => {
  
//     if (error.response?.status === 401) {
//       console.log("Session expired");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default API;
