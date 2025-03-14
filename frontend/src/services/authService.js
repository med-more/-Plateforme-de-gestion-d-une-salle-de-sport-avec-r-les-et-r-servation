const API_URL = import.meta.env.VITE_API_URL; // Ensure this is set correctly in your .env file
import axios from "axios";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message); // Debugging: Log the error
      throw error;
    }
  };