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
