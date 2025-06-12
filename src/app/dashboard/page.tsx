'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role === 'job_seeker') {
      router.push('/dashboard/job-seeker');
    } else if (user.role === 'employer') {
      router.push('/dashboard/employer');
    }
  }, [user, router]);

  return null;
}