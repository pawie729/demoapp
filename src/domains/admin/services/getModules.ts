import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface Module {
  rawId: number;
  moduleCode: string;
  description: string;
  sequence: number;
  [key: string]: any;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.REACT_APP_API_URL;
const ADMIN = "admin/"; // Admin path

const axiosConfig = axios.create({
  baseURL: `${BASE_URL}${ADMIN}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    // Handle 401 UnAuthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/refreshToken`, {
            refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/";
        }
      }
    }

    // Handle 403 Forbidden
    if (status === 403) {
      console.error(
        "Access denied: You do not have permission to access this resource."
      );
      alert("Access denied.");
    }

    // Handle 503 Service Unavailable
    if (status === 503) {
      console.error("Service unavailable: Please try again later.");
      alert("Service is currently unavailable. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export const getModules = async (): Promise<Module[]> => {
  try {
    const response = await axiosConfig.get("modules"); // Use `${BASE_URL}${ADMIN}modules`
    if (response.status === 200) {
      console.log("Modules fetched successfully:", response.data.data);
      return response.data.data;
    }
    throw new Error("Unexpected API response.");
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw new Error("Failed to fetch modules.");
  }
};

export default axiosConfig;
