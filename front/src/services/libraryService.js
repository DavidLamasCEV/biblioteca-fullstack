import apiClient from "./baseService";

export const createLibrary = (libraryData) => {
  return apiClient.post("/libraries", libraryData);
};

export const getLibraries = () => {
  return apiClient.get("/libraries");
};