'use client';
import React from 'react';
import Link from 'next/link';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  applied: boolean;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.description}</p>
      
      {job.applied ? (
        <p className="text-green-600 mt-2">Applied</p>
      ) : (
        <Link
          href={`job-seeker/apply/${job.id}`}
          className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Apply
        </Link>
      )}
    </div>
  );
}