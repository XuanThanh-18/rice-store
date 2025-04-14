import axios from "./axiosConfig";

export const login = async (credentials) => {
  const response = await axios.post("/auth/signin", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post("/auth/refreshtoken", { refreshToken });
  return response.data;
};
