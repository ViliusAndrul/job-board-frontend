'use client';

import React from 'react';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
};

type Props = {
  job: Job;
  onApply: (jobId: number) => void;
};

export default function JobCard({ job, onApply }: Props) {
  return (
    <li className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p>{job.description}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => onApply(job.id)}
      >
        Apply
      </button>
    </li>
  );
}
