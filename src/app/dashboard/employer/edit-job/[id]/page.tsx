'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { fetchJobById, updateJob } from '@/lib/api';
import JobForm from '@/components/JobForm';
import axios from 'axios';
import Link from 'next/link';


export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
    location: string;
    salary: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'employer') {
      router.push('/dashboard');
      return;
    }

    const load = async () => {
      try {
        const job = await fetchJobById(id as string);
        setInitialValues({
          title: job.title,
          description: job.description,
          location: job.location,
          salary: job.salary,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, user, router]);

  const handleUpdate = async (values: {
    title: string;
    description: string;
    location: string;
    salary: string;
  }) => {
    try {
      await updateJob(id as string, values);
      alert('Job updated!');
      router.push('/dashboard/employer');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data.error || 'Failed to update job');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!initialValues) return <p>No job data</p>;

  return (
  <div className="p-6 space-y-8 bg-gray-900 min-h-screen text-gray-100">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Edit Job Posting</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
      >
        Log Out
      </button>
    </div>

    <div className="flex gap-4">
      <Link
        href="/dashboard/employer"
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
      >
        ← Back to Dashboard
      </Link>
    </div>

    <div className="border border-gray-700 rounded-lg p-6 shadow-md bg-gray-800">
      <JobForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        buttonLabel="Update Job"
      />
    </div>
  </div>
);
}
