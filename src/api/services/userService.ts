import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import api from "./api";
import { API_CONFIG } from "../../config/api.config";

export const userService = {
  checkEligibility: async (betsaveId: string, balance: number) => {
    const response = await api.get(
      `/users/eligibility/${betsaveId}/${balance}`
    );
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get(`/users`);
    return response.data;
  },

  getUserWalletData: async (betsaveId: string) => {
    const response = await api.get(`/users/wallet-data/${betsaveId}`);
    return response.data;
  },

  getUserInfo: async (betsaveId: string) => {
    const response = await api.get(`/users/info/${betsaveId}`);
    return response.data;
  },

  updateUserInfo: async (betsaveId: string, data: any) => {
    const formData = new FormData();
    
    if (data.file) {
      console.log("data.file: ", data.file);
      formData.append('image', data.file);
    }
    
    // Append other form fields
    Object.keys(data).forEach(key => {
      if (key !== 'file') {
        console.log("key: ", key, "data[key]: ", data[key]);
        formData.append(key, data[key]);
      }
    });
    
    console.log("formData: ", formData);
    
    // For FormData, don't set Content-Type manually - let the browser set it with boundary
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/info/${betsaveId}`, {
      method: 'PUT',
      body: formData,
    });

    const res =  await response.json();
    console.log("res: ", res);
    return res;
  },
};
