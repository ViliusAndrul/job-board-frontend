'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import axios from 'axios';

export default function LoginPage(): JSX.Element {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.error || 'Login failed');
        } else {
            setError('Unexpected error');
        }
        }
    };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setemail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
