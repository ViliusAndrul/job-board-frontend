'use client';
import React from 'react';
import JobCard from './JobCard';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  applied: boolean;
};

type Props = {
  jobs: Job[];
};

export default function JobList({ jobs }: Props) {
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </ul>
  );
}