'use client';

import { useRouter } from 'next/navigation';
import { postJob } from '@/lib/api';
import JobForm, { JobData } from '@/components/JobForm';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

export default function CreateJobPage() {
  const router = useRouter();
  const {logout } = useAuth();

  const handleCreate = async (values: JobData) => {
  await postJob(values);
  router.push('/dashboard/employer');
};


  return (
  <div className="p-6 space-y-8 bg-gray-900 min-h-screen text-gray-100">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Create Job</h1>
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
        onSubmit={handleCreate}
        buttonLabel="Create Job"
      />
    </div>
  </div>
);
}
