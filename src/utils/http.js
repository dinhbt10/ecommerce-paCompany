import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error) {
      toast.error("Có lỗi xảy ra", {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
    return Promise.reject(error);
  }
);
