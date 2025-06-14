import JobForm from '@/components/JobForm';

export default function CreateJobPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <JobForm />
    </div>
  );
}