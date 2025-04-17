import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

export type Job = {
  _id: string;
  jobTitle: string;
  company: string;
  postingLink?: string;
};

export type JobTableHandle = {
  refresh: () => void;
};

const JobTable = forwardRef<JobTableHandle>((_, ref) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = () => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        console.log("✅ Jobs fetched:", data);
      })
      .catch((err) => console.error("❌ Error fetching jobs:", err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: fetchJobs,
  }));

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } else {
        setMessage("Failed to delete job.");
        setMessageType("error");
        console.error("Failed to delete job");
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
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
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Posting Link</th>
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
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs to display yet.</p>
      )}
    </div>
  );
});

export default JobTable;
