// src/api/api.js
import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL_PRO 
  : import.meta.env.VITE_API_URL_DEV || 'http://localhost:3000';

console.log('API Base URL:', baseURL); // For debugging

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken'); // Fixed to use userToken instead of token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - Please check your API URL configuration');
    }
    return Promise.reject(error);
  }
);

export default api;