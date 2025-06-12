'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import JobList from '@/components/JobList';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);


  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role === 'job_seeker') {
      axios.get('http://localhost:5000/api/jobs')
        .then((res) => setJobs(res.data))
        .catch((err) => console.error(err));
    }
  }, [router, user]);

  const handleApply = (jobId: number) => {
    alert(`Apply to job ID: ${jobId}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-4">
        <button
  onClick={logout}
  className="p-2 bg-red-500 text-white rounded"
>
  Log Out
</button>
      <h1 className="text-2xl font-bold mb-4">Job Seeker Dashboard</h1>
      <JobList jobs={jobs} onApply={handleApply} />
    </div>
  );
}
