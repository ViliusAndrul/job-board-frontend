'use client';
import React from 'react';
import JobCard from './JobCard';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  applied: boolean;
};

interface JobListProps {
  jobs: Job[];
  title?: string;
  showFilters?: boolean;
}
export default function JobList({ jobs, title, showFilters }: JobListProps) {
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">
        {title || 'Available Jobs'}
      </h2>
      {showFilters && (
        <div className="flex gap-3">
          <select className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Filter by...</option>
            <option>Remote</option>
            <option>Full-time</option>
            <option>Contract</option>
          </select>
          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
    </div>

    {jobs.length === 0 ? (
      <div className="border border-gray-700 rounded-lg p-8 text-center bg-gray-800">
        <p className="text-gray-400">No jobs found. Check back later!</p>
      </div>
    ) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    )}
  </div>
);
}