import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = async (username: string,email: string, password: string, role: string) => {
  const res = await API.post('/auth/register', {username, email, password, role });
  return res.data;
};


export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

API.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function applyToJob(jobId: number) {
  const response = await API.post('/applications', {
    job_id: jobId
  });
  return response.data;
}

export const fetchEmployerApplications = async () => {
  try {
    const res = await API.get('/applications/employer');
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch employer applications:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
    throw error;
  }
};