import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL, // for Vite
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
