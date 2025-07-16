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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">{buttonLabel === 'Update Job' ? 'Edit Job' : 'Post a New Job'}</h2>
      {message && <p className="text-sm text-red-600">{message}</p>}
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {buttonLabel}
      </button>
    </form>
  );
}
