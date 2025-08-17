'use client';
import React from 'react';
import Link from 'next/link';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  applied: boolean;
};

export default function JobCard({ job }: { job: Job }) {
  return (
  <div className="border border-gray-700 rounded-lg p-6 shadow-md bg-gray-800 space-y-4 hover:bg-gray-750 transition-colors">
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-white">{job.title}</h3>
      <p className="text-gray-300 line-clamp-3">{job.description}</p>
    </div>

    <div className="flex flex-wrap gap-2 pt-2">
      {job.location && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
          🌍 {job.location}
        </span>
      )}
      {job.salary && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
          💰 {job.salary}
        </span>
      )}
    </div>

    {job.applied ? (
      <div className="flex items-center gap-2 mt-4 text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Application Submitted</span>
      </div>
    ) : (
      <Link
        href={`job-seeker/apply/${job.id}`}
        className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
      >
        Apply Now
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    )}
  </div>
);
}