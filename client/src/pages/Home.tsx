import { useState, useRef } from "react";
import AddJob from "../components/job/AddJob";
import JobTable from "../components/JobTable";
import type { JobTableHandle } from "../types/job";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const tableRef = useRef<JobTableHandle>(null);
  const navigate = useNavigate();

  const handleRefresh = () => {
    tableRef.current?.refresh();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-4 mb-6">
        <button onClick={() => setIsAddJobOpen(true)}>Add a Job</button>
        <button onClick={() => navigate("/resumes")}>Go to Resumes</button>
        <AddJob
          isOpen={isAddJobOpen}
          onClose={() => setIsAddJobOpen(false)}
          onSuccess={handleRefresh}
        />
      </div>

      <div className="lg:w-3/4 w-full">
        <JobTable ref={tableRef} />
      </div>
    </div>
  );
}
