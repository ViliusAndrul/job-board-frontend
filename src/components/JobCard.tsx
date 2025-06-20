'use client';

import React, { useState } from 'react';
import axios from 'axios';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  applied: boolean;
};

export default function JobCard({
  job,
  onApply,
}: {
  job: Job;
  onApply: (jobId: number) => void;
}) {
  const [error, setError] = useState('');

  const handleApply = async () => {
    try {
      await onApply(job.id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to apply');
      } else {
        setError('Unexpected error');
      }
    }
  };

  return (
    <div className="border rounded p-4 shadow">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.description}</p>
      {job.applied ? (
      <p className="text-green-600 mt-2">Applied</p>
      ) : (
        <button
          onClick={handleApply}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Apply
        </button>
        )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
