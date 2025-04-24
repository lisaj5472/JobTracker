import { useState, useRef } from "react";
import AddJob from "../components/job/AddJob";
import JobLibrary from "../components/job/JobLibrary";
import type { JobLibraryHandle } from "../types/job";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const tableRef = useRef<JobLibraryHandle>(null);
  const navigate = useNavigate();

  const handleRefresh = () => {
    tableRef.current?.refresh();
  };

  return (
    <div className="home-container">
      {/* Sidebar Menu */}
      <aside className="sidebar">
        <nav className="menu">
          <button onClick={() => setIsAddJobOpen(true)}>Add a Job</button>
          <button onClick={() => navigate("/resumes")}>Go to Resumes</button>
        </nav>
        <AddJob
          isOpen={isAddJobOpen}
          onClose={() => setIsAddJobOpen(false)}
          onSuccess={handleRefresh}
        />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <JobLibrary ref={tableRef} />
      </main>
    </div>
  );
}
