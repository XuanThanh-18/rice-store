import axios from "./axiosConfig";

export const getCart = async () => {
  const response = await axios.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await axios.post("/cart/add", { productId, quantity });
  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axios.put(`/cart/items/${cartItemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await axios.delete(`/cart/items/${cartItemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete("/cart/clear");
  return response.data;
};
