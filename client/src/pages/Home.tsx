// src/pages/Home.tsx
import { useRef } from "react";
import AddJob from "../components/AddJob";
import JobTable, { JobTableHandle } from "../components/JobTable";

export default function Home() {
  const tableRef = useRef<JobTableHandle>(null);

  const handleRefresh = () => {
    tableRef.current?.refresh();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4 w-full">
        {" "}
        {/* Form takes 25% */}
        <AddJob onSuccess={handleRefresh} />
      </div>
      <div className="lg:w-3/4 w-full">
        {" "}
        {/* Table gets 75% */}
        <JobTable ref={tableRef} />
      </div>
    </div>
  );
}
