import axios from 'axios';
// NO MORE import { Clerk } from '@clerk/clerk-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// We need to make the interceptor async
api.interceptors.request.use(
  async (config) => {
    
    // This is the new way to get the Clerk instance
    // It's globally available on the 'window' object
    try {
      if (window.Clerk && window.Clerk.session) {
        // Get the active session token
        const token = await window.Clerk.session.getToken();
        
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;

    } catch (error) {
      console.error("Error getting Clerk token for API request:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;