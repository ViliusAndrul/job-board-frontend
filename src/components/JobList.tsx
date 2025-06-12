'use client';

import React from 'react';
import JobCard from './JobCard';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
};

type Props = {
  jobs: Job[];
  onApply: (jobId: number) => void;
};

export default function JobList({ jobs, onApply }: Props) {
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </ul>
  );
}
