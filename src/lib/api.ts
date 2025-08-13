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
  
    const res = await API.get('/applications/employer');
    return res.data;
   
};

export const postJob = async (jobData: {
  title: string;
  description: string;
  location: string;
  salary: string;
}) => {
  const res = await API.post('/jobs', jobData);
  return res.data;
};

export const updateJob = async (
  id: string | number,
  data: { title: string; description: string; location: string; salary: string }
) => {
  const token = localStorage.getItem('token');
  const res = await API.put(`/jobs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchJobById = async (id: string | number) => {
  const token = localStorage.getItem('token');
  const res = await API.get(`/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export async function deleteJob(id: string): Promise<void> {
  await API.delete(`/jobs/${id}`);
}