import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUserReservations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/reservations/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token with the request
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reservations');
  }
};