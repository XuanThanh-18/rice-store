import axios from "./axiosConfig";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post("/orders", orderData);
    // Make sure we're returning the response data in a consistent format
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrders = async (params) => {
  const response = await axios.get("/orders/my-orders", { params });
  return response.data;
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
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
