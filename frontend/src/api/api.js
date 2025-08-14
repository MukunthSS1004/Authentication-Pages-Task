import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export const signup = (payload) => API.post('/auth/signup', payload);
export const login = (payload) => API.post('/auth/login', payload);
