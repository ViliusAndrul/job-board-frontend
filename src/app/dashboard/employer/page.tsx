'use client';

import React, { useEffect, useState } from 'react';
import { fetchEmployerApplications } from '@/lib/api';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Application = {
  id: number;
  job_id: number;
  user_id: number;
  resume_url: string | null;
  username: string;
  title: string;
};

type JobGroup = {
  title: string;
  applicants: Application[];
}

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

  const jobsById = applications.reduce((acc: { [key: number]: { title: string; applicants: Application[] } }, app: Application) => {
  if (!acc[app.job_id]) {
    acc[app.job_id] = { title: app.title, applicants: [] };
  }
  acc[app.job_id].applicants.push(app);
  return acc;
}, {});

  return (
    <div className="p-4 space-y-6">
    <h1 className="text-2xl font-bold">Employer Dashboard</h1>

      <Link
        href="/employer/create-job"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Post New Job
      </Link>
        <button onClick={logout} className="p-2 bg-red-500 text-white rounded">
        Log Out
      </button>
      <h2 className="text-2xl font-semibold mb-4">Your Job Applications</h2>
      {error && <p className="text-red-500">{error}</p>}
      {Object.entries(jobsById).map(([jobId, jobData]: [string, JobGroup]) => (
        <div key={jobId} className="border rounded p-4 shadow">
          <h3 className="text-xl font-bold">{jobData.title}</h3>
          {jobData.applicants.length === 0 ? (
            <p className="text-gray-600">No applicants yet.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {jobData.applicants.map((app: Application) => (
                <li key={app.id} className="border-b pb-2">
                  <p><strong>{app.username}</strong></p>
                  {app.resume_url ? (
                    <a href={app.resume_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    <p className="text-gray-500">No resume provided</p>
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

