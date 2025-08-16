'use client';

import React, { useEffect, useState } from 'react';
import { fetchEmployerApplications } from '@/lib/api';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { deleteJob } from '@/lib/api';
import Link from 'next/link';

type Application = {
  job_id: number;
  title: string;
  id: number | null;
  user_id: number | null;
  username: string | null;
  resume_url: string;
  cover_letter: string;
};

type JobGroup = {
  title: string;
  applicants: {
    id: number;
    user_id: number;
    username: string;
    resume_url: string;
    cover_letter: string;
  }[];
};


export default function EmployerDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'employer') {
      router.push('/dashboard');
      return;
    }

    const loadData = async () => {
      try {
        const data = await fetchEmployerApplications();
        setApplications(data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
        setError('Failed to load applications');
      }
    };
    loadData();
  }, [router, user]);

  const jobsById = applications.reduce((acc: { [key: number]: JobGroup }, row: Application) => {
  if (!acc[row.job_id]) {
    acc[row.job_id] = {
      title: row.title,
      applicants: [],
    };
  }

  if (row.id && row.user_id && row.username && row.resume_url !== undefined) {
    acc[row.job_id].applicants.push({
      id: row.id,
      user_id: row.user_id,
      username: row.username,
      resume_url: row.resume_url,
      cover_letter: row.cover_letter,
    });
  }

  return acc;
}, {});

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this job?')) {
    try {
      await deleteJob(id.toString());
      setApplications((prev) => prev.filter(app => app.job_id !== id));
    } catch (err) {
      alert('Failed to delete job');
      console.error(err);
    }
  }
};


  return (
  <div className="p-6 space-y-8 bg-gray-900 min-h-screen text-gray-100">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Employer Dashboard</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
      >
        Log Out
      </button>
    </div>

    <div className="flex gap-4">
      <Link
        href="/dashboard/employer/create-job"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
      >
        + Post New Job
      </Link>
    </div>

    <h2 className="text-2xl font-semibold">Your Job Applications</h2>
    {error && <p className="text-red-400">{error}</p>}

    {Object.entries(jobsById).map(([jobId, jobData]: [string, JobGroup]) => (
      <div key={jobId} className="border border-gray-700 rounded-lg p-6 shadow-md bg-gray-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{jobData.title}</h3>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/employer/edit-job/${jobId}`}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(Number(jobId))}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>

        {jobData.applicants.length === 0 ? (
          <p className="text-gray-400 italic">No applicants yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobData.applicants.map((app) => (
              <li
                key={app.id}
                className="p-4 border border-gray-700 rounded-lg shadow-sm bg-gray-700 space-y-3"
              >
                <p className="font-semibold text-lg text-white">{app.username}</p>

                <div>
                  <p className="text-sm font-medium text-gray-300">Cover Letter:</p>
                  <div className="p-3 bg-gray-800 border border-gray-600 rounded-md max-h-40 overflow-y-auto whitespace-pre-line text-gray-100 text-sm">
                    {app.cover_letter || <span className="text-gray-400">No cover letter provided</span>}
                  </div>
                </div>

                {app.resume_url ? (
                  <a
                    href={app.resume_url}
                    className="inline-block mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">No resume provided</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);
}