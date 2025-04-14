// src/api/userApi.js
import axios from "./axiosConfig";

export const getUserProfile = async () => {
  const response = await axios.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await axios.put(
    `/users/${profileData.id || "profile"}`,
    profileData
  );
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await axios.put("/users/change-password", passwordData);
  return response.data;
};

export const getAllUsers = async (params) => {
  const response = await axios.get("/admin/users", { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const updateUserRole = async (id, roleData) => {
  const response = await axios.put(`/admin/users/${id}/role`, roleData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/admin/users/${id}`);
  return response.data;
};
