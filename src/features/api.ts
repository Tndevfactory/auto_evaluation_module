import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_API_SERVER;

if (import.meta.env.MODE === "development") {
  console.log(".env.MODE :", import.meta.env.MODE);
  baseURL = import.meta.env.VITE_BASE_API_SERVER;
} else {
  console.log(".env.MODE : ", import.meta.env.MODE);
  baseURL = import.meta.env.VITE_BASE_API_PRODUCTION_SERVER;
}

export const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: baseURL,
});

api.interceptors.request.use(function (config) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };
  config.headers = { Accept: "application/json" };
  config.headers = { "content-type": "application/json" };

  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : null;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
