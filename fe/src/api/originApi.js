import axios from "./axiosConfig";

export const getAllOrigins = async (params) => {
  const response = await axios.get("/origins", { params });
  return response.data;
};

export const getOriginById = async (id) => {
  const response = await axios.get(`/origins/${id}`);
  return response.data;
};

export const createOrigin = async (originData) => {
  const response = await axios.post("/origins", originData);
  return response.data;
};

export const updateOrigin = async (id, originData) => {
  const response = await axios.put(`/origins/${id}`, originData);
  return response.data;
};

export const deleteOrigin = async (id) => {
  const response = await axios.delete(`/origins/${id}`);
  return response.data;
};

export const activateOrigin = async (id) => {
  const response = await axios.put(`/origins/${id}/activate`);
  return response.data;
};
