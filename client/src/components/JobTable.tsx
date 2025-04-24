import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import EditJobModal from "./job/EditJob";
import { fetchJobs, deleteJob, updateJob } from "../api/jobsApi";
import type { Job, JobTableHandle } from "../types/job";

const JobTable = forwardRef<JobTableHandle>((_, ref) => {
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
      setMessage("✅ Jobs fetched successfully!");
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
      const result = await updateJob(_id, jobWithoutId);
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
    <div className="table-wrapper">
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
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Posting Link</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date Applied</th>
              <th className="px-4 py-2 text-left">Date Rejected</th>
              <th className="px-4 py-2 text-left">Resume Version</th>
              <th className="px-4 py-2 text-left">Notes</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{job.jobTitle}</td>
                <td className="px-4 py-2">{job.company}</td>
                <td className="px-4 py-2">
                  {job.postingLink ? (
                    <a
                      href={
                        job.postingLink.startsWith("http")
                          ? job.postingLink
                          : `https://${job.postingLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.postingLink}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2">{job.status || "N/A"}</td>
                <td className="px-4 py-2">{job.appliedDate || "N/A"}</td>
                <td className="px-4 py-2">{job.rejectedDate || "N/A"}</td>
                <td className="px-4 py-2">{job.resumeVersion || "N/A"}</td>
                <td className="px-4 py-2">{job.notes || "N/A"}</td>

                {/* Actions Column */}
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setIsModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                    <button onClick={() => handleDelete(job._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs to display yet.</p>
      )}
      <EditJobModal
        isOpen={isModalOpen}
        job={editingJob!} // '!' because we only open the modal if it's set
        onClose={() => setIsModalOpen(false)}
        onSave={(updatedJob) => handleUpdate(updatedJob._id, updatedJob)}
      />
    </div>
  );
});

export default JobTable;
