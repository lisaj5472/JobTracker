import { useState } from "react";
import JobInputForm from "./JobInputForm";
import { addJob } from "../../api/jobsApi";
import normalizeJob from "../../utils/jobHelpers";
import { Job } from "../../types/job";

type AddJobProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddJob({ isOpen, onSuccess, onClose }: AddJobProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  if (!isOpen) return null;

  const postJob = async (newJob: Job, reset: () => void) => {
    try {
      const jobToSend = normalizeJob(newJob);
      await addJob(jobToSend);
      setMessage("✅ Job saved successfully!");
      setMessageType("success");
      reset();
      onSuccess();
      onClose();
      console.log("✅ Job saved:", jobToSend);
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
      console.error("❌ Error saving job:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Add a New Job</h2>
        <p>You only need to fill out the fields you want to add.</p>

        <JobInputForm onSubmit={postJob} onCancel={onClose} />
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
      </div>
    </div>
  );
}
