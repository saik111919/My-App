import axios from "axios";

const instance = axios.create({ withCredentials: true });

instance.interceptors.response.use(
  (successRes) => successRes,
  ({ response }) => {
    if (response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(response);
  }
);

export const client = instance;