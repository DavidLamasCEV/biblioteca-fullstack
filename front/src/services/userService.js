import apiClient from "./baseService";

// Registro: POST /api/users/register
export const registerUser = (userData) => {
  return apiClient.post("/users/register", userData);
};

// Login: POST /api/users/login
export const loginUser = (userData) => {
  return apiClient.post("/users/login", userData);
};

// Perfil: GET /api/users/:id   <-- ESTA ES LA QUE TE FALTABA
export const getUserProfile = (id) => {
  return apiClient.get(`/users/${id}`);
};