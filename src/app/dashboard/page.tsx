'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null; // Or loading spinner

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-4">
        <button
  onClick={logout}
  className="p-2 bg-red-500 text-white rounded"
>
  Log Out
</button>
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <p>Your role: {user.role}</p>
    </div>
  );
}
