import axios from "./axiosConfig";

export const getAllRiceTypes = async (params) => {
  const response = await axios.get("/rice-types", { params });
  return response.data;
};

export const getRiceTypeById = async (id) => {
  const response = await axios.get(`/rice-types/${id}`);
  return response.data;
};

export const createRiceType = async (riceTypeData) => {
  const response = await axios.post("/rice-types", riceTypeData);
  return response.data;
};

export const updateRiceType = async (id, riceTypeData) => {
  const response = await axios.put(`/rice-types/${id}`, riceTypeData);
  return response.data;
};

export const deleteRiceType = async (id) => {
  const response = await axios.delete(`/rice-types/${id}`);
  return response.data;
};

export const activateRiceType = async (id) => {
  const response = await axios.put(`/rice-types/${id}/activate`);
  return response.data;
};
