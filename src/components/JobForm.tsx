'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { postJob } from '@/lib/api';

export default function JobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postJob({ title, description, location, salary });
      router.push('/dashboard/employer');
    } catch (err) {
    if (axios.isAxiosError(err)) {
      setMessage(err.response?.data?.message || 'Failed to create job');
    } else {
      setMessage('An unexpected error occurred');
    }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Post a New Job</h2>
      {message && <p className="text-sm text-blue-600">{message}</p>}
      <input
        type="text"
        placeholder="Job title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Job description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Job
      </button>
    </form>
  );
}
