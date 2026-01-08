import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Tu puerto backend
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default apiClient;