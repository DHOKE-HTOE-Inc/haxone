import axios from "axios";
import config from "../config";
import { store } from "../store/store";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const auth = state.auth;

    if (auth.accessToken) {
      config.headers.Authorization = `JWT ${auth.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh if 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch({ type: "auth/refresh" });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
