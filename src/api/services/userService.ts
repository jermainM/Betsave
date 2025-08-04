import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import api from "./api";

export const userService = {
  getUserBalance: async (betsaveId: string) => {
    const response = await api.get(`/pinup/wallet-balance/${betsaveId}`);
    return response.data;
  },
  checkEligibility: async (betsaveId: string) => {
    const response = await api.get(`/users/eligibility/${betsaveId}`);
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get(`/users`);
    return response.data;
  },
  getGeoLocation: async (ipAddress: string) => {
    const response = await api.get(`/users/geo-location/${ipAddress}`);
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
    const response = await api.put(`/users/info/${betsaveId}`, formData);
    return response.data;
  },
};
