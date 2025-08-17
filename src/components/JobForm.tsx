'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

export type JobData = {
  title: string;
  description: string;
  location: string;
  salary: string;
};

type JobFormProps = {
  initialValues?: JobData;
  onSubmit: (data: JobData) => Promise<void>;
  buttonLabel?: string;
};

export default function JobForm({
  initialValues,
  onSubmit,
  buttonLabel = 'Submit',
}: JobFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setLocation(initialValues.location);
      setSalary(initialValues.salary);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ title, description, location, salary });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Submission failed');
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-6">
    <h2 className="text-2xl font-bold text-white">
      {buttonLabel === 'Update Job' ? 'Edit Job' : 'Post a New Job'}
    </h2>
    
    {message && (
      <p className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-300">
        {message}
      </p>
    )}

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Job Title</label>
      <input
        type="text"
        placeholder="e.g. Senior Frontend Developer"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Job Description</label>
      <textarea
        placeholder="Describe the job responsibilities and requirements..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Location</label>
        <input
          type="text"
          placeholder="e.g. Remote, New York, etc."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Salary</label>
        <input
          type="text"
          placeholder="e.g. $90,000 - $120,000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
    >
      {buttonLabel}
    </button>
  </form>
);
}
