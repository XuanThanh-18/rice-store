import axios from "./axiosConfig";

export const login = async (credentials) => {
  // Ensure credentials are trimmed before sending to API
  const trimmedCredentials = {
    username: credentials.username.trim(),
    password: credentials.password,
  };
  const response = await axios.post("/auth/signin", trimmedCredentials);
  return response.data;
};

export const register = async (userData) => {
  const trimmedUserData = {
    username: userData.username.trim(),
    email: userData.email.trim(),
    password: userData.password,
    fullName: userData.fullName.trim(),
  };
  const response = await axios.post("/auth/signup", trimmedUserData);
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
