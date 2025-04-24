import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import EditJobModal from "./EditJob";
import { fetchJobs, deleteJob, updateJob } from "../../api/jobsApi";
import type { Job, JobLibraryHandle } from "../../types/job";
import JobCard from "./JobCard";

const JobLibrary = forwardRef<JobLibraryHandle>((_, ref) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Error fetching jobs.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: loadJobs,
  }));

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      setMessage("Job deleted successfully!");
      setMessageType("success");
    } catch (err) {
      console.error("❌ DELETE error:", err);
      setMessage("❌ Error deleting job.");
      setMessageType("error");
    }
  };

  const handleUpdate = async (id: string, updatedJob: Job) => {
    const { _id, ...jobWithoutId } = updatedJob;

    try {
      const result = await updateJob(_id!, jobWithoutId);
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, ...result } : job))
      );
      setMessage("Job updated successfully!");
      setMessageType("success");
      loadJobs();
    } catch (err) {
      console.error("❌ PUT error:", err);
    }
  };

  return (
    <div className="job-library-wrapper">
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      {jobs.length > 0 ? (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={() => {
                setEditingJob(job);
                setIsModalOpen(true);
              }}
              onDelete={() => job._id && handleDelete(job._id)}
            />
          ))}
        </div>
      ) : (
        <p>No jobs to display yet.</p>
      )}
      <EditJobModal
        isOpen={isModalOpen}
        job={editingJob!} // '!' because we only open the modal if it's set
        onClose={() => setIsModalOpen(false)}
        onSave={(updatedJob) => handleUpdate(updatedJob._id!, updatedJob)}
      />
    </div>
  );
});

export default JobLibrary;
