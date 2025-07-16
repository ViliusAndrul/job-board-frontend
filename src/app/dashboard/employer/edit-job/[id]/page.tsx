'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { fetchJobById, updateJob } from '@/lib/api';
import JobForm from '@/components/JobForm';
import axios from 'axios';

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

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
    <div className="max-w-xl mx-auto mt-10">
      <JobForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        buttonLabel="Update Job"
      />
    </div>
  );
}
