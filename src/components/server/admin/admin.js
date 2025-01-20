import axios from "axios";
import apiClient from "../axiosConfig";
export const addVisaType = async (login) => {
  try {
    const response = await apiClient.post(`/admin/visa/add-type`, login);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchAllVisaTypes = async () => {
  try {
    const response = await apiClient.get(`/admin/visa/visa-types`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addNewDocumentType = async (doc) => {
  try {
    const response = await apiClient.post(`/admin/visa/add-doc-type`, doc);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const addNewVisa = async (visa) => {
  console.log(visa);
  try {
    const response = await apiClient.post(`/admin/visa/add-visa`, visa, {
      headers: {
        "Content-Type": "multipart/form-data", // Automatically handled by FormData, but it's good to explicitly set it
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateVisa = async (visa) => {
  // console.log(visa);
  try {
    const response = await apiClient.put(`/admin/visa/update/visa`, visa, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updatImage = async (imageData) => {
  // console.log(visa);
  try {
    const response = await apiClient.put(
      `/admin/visa/update/image`,
      imageData,
      {}
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
