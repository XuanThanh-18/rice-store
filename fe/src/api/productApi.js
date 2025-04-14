import axios from "./axiosConfig";

export const getProducts = async (params) => {
  const response = await axios.get("/products", { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
};

export const getRiceTypes = async () => {
  const response = await axios.get("/rice-types");
  return response.data;
};

export const getOrigins = async () => {
  const response = await axios.get("/origins");
  return response.data;
};
