import axios from "axios";
import { store } from "../redux/store";
// Base URL for API requests
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true, 
  },
});

// Add request interceptor for authentication
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token; // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
console.log(localStorage.getItem("token"));

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
