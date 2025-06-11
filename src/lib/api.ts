import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend
});

export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

// Add more later (register, fetch jobs, etc.)