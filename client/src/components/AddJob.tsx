import { useState } from "react";
import JobInputForm from "./JobInputForm";

type Job = {
  jobTitle: string;
  company: string;
  postingLink?: string;
};

type AddJobProps = {
  onSuccess: () => void;
};

export default function AddJob({ onSuccess }: AddJobProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const addJob = async (newJob: Job, reset: () => void) => {
    const cleanLink = newJob.postingLink?.startsWith("http")
      ? newJob.postingLink
      : `https://${newJob.postingLink?.trim()}`;

    const jobToSend = {
      ...newJob,
      postingLink: cleanLink,
    };
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobToSend),
      });
      if (!response.ok) {
        setMessage("Failed to save job.");
        setMessageType("error");
        return;
      }
      setMessage("✅ Job saved successfully!");
      setMessageType("success");
      reset();
      onSuccess();
      console.log("✅ Job saved:", jobToSend);
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
      console.error("❌ Error saving job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="mb-8">
        <h1>Job Tracker</h1>
        <p>Track all your applications in one place.</p>
      </header>
      <main>
        <JobInputForm onSubmit={addJob} />
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
      </main>
    </div>
  );
}
