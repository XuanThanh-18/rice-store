import axios from "./axiosConfig";

export const createOrder = async (orderData) => {
  const response = await axios.post("/orders", orderData);
  return response.data;
};

export const getOrders = async (params) => {
  const response = await axios.get("/orders/my-orders", { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await axios.put(`/orders/${id}/cancel`);
  return response.data;
};

// Admin order functions
export const getAllOrders = async (params) => {
  const response = await axios.get("/orders", { params });
  return response.data;
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await axios.put(`/orders/${id}/status`, statusData);
  return response.data;
};

export const getDashboardData = async (params) => {
  const response = await axios.get("/orders/dashboard", { params });
  return response.data;
};
