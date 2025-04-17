import { useRef } from "react";
import AddJob from "../components/AddJob";
import JobTable, { JobTableHandle } from "../components/JobTable";

export default function Home() {
  const tableRef = useRef<JobTableHandle>(null);

  const handleRefresh = () => {
    tableRef.current?.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Job Tracker</h1>
        <p className="text-lg">Track all your applications in one place.</p>
      </header>

      <main className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 w-full">
          <AddJob onSuccess={handleRefresh} />
        </div>

        <div className="lg:w-2/3 w-full">
          <JobTable ref={tableRef} />
        </div>
      </main>
    </div>
  );
}
