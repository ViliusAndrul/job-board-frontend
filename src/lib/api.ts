import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend
});

export const register = async (username: string,email: string, password: string, role: string) => {
  const res = await API.post('/auth/register', {username, email, password, role });
  return res.data;
};


export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

// Add more later (register, fetch jobs, etc.)