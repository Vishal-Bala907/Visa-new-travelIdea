import axios from "axios";
import apiClient from "../axiosConfig";

export const getAllVisas = async () => {
  try {
    const response = await apiClient.get(`/data/visas`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCountryWiseVisa = async (countryname) => {
  try {
    const response = await apiClient.get(`/data/country/name/${countryname}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllDocuments = async () => {
  try {
    const response = await apiClient.get(`/admin/visa/docs`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getDocumentList = async (countryname) => {
  try {
    const response = await apiClient.get(`/data/doc/checklist/${countryname}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getProfile = async () => {
  try {
    const response = await apiClient.get(`/data/profile`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const getProfile = await apiClient
