import axios from "axios";
const axiosApisInstance = axios.create({
  // baseURL: " http://108.181.190.64:4000/api/v1", // hosted
  baseURL: import.meta.env.VITE_BASE_URL, // local/
  // validateStatus: (status) => true,
});

axiosApisInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("Authorization")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosApisInstance;
