'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';
import { useAuth } from '@/context/authContext';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
      if (user) {
        router.push('/dashboard');
      }
    }, [router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(username, email, password, role);
      console.log(data);
      localStorage.setItem('token', data.token);
      login(data.token);
      router.push('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Registration failed');
      } else {
        setError('Unexpected error');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
                <div className="space-y-2">
        <label className="block font-semibold">Role:</label>
        <label className="inline-flex items-center mr-4">
            <input
            type="radio"
            value="employer"
            checked={role === 'employer'}
            onChange={() => setRole('employer')}
            className="mr-2"
            />
            Employer
        </label>
        <label className="inline-flex items-center">
            <input
            type="radio"
            value="job_seeker"
            checked={role === 'job_seeker'}
            onChange={() => setRole('job_seeker')}
            className="mr-2"
            />
            Job Seeker
        </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
}
