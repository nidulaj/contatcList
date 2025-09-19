import axios from "axios";
import { API_URL } from "./api";

export const authFetch = async (config) => {
  try {
    // Ensure credentials are always sent
    config.withCredentials = true;
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };

    return await axios(config);
  } catch (err) {
    const status = err.response?.status;
    // Retry for both 401 (missing) and 403 (invalid/expired)
    if ((status === 401 || status === 403) && !config._retry) {
      config._retry = true;

      try {
        // Wait for the refresh request to finish so cookie is set
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        // Retry original request (withCredentials already set on config)
        return await axios(config);
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        // Redirect to login
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
};
