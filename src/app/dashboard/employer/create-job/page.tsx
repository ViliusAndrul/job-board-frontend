'use client';

import { useRouter } from 'next/navigation';
import { postJob } from '@/lib/api';
import JobForm, { JobData } from '@/components/JobForm';

export default function CreateJobPage() {
  const router = useRouter();

  const handleCreate = async (values: JobData) => {
  await postJob(values);
  router.push('/dashboard/employer');
};


  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Create Job</h1>
      <JobForm
        onSubmit={handleCreate}
        buttonLabel="Create Job"
      />
    </div>
  );
}
