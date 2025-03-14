import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all sessions
export const getSessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/sessions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sessions');
  }
};

// Create a new session
export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${API_URL}/api/sessions`, sessionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create session');
  }
};

// Update an existing session
export const updateSession = async (sessionId, sessionData) => {
  try {
    const response = await axios.put(`${API_URL}/api/sessions/${sessionId}`, sessionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update session');
  }
};