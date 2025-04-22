import { useForm, Controller } from "react-hook-form";

type JobFormData = {
  jobTitle: string;
  company: string;
  postingLink?: string;
  status?: string;
  appliedDate?: string;
  rejectedDate?: string;
  resumeVersion?: string;
  notes?: string;
};

type JobFormProps = {
  onSubmit: (data: JobFormData, reset: () => void) => void;
};

export default function JobInputForm({ onSubmit }: JobFormProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    defaultValues: {
      jobTitle: "",
      company: "",
      postingLink: "",
      status: "",
      appliedDate: "",
      rejectedDate: "",
      resumeVersion: "",
      notes: "",
    },
  });

  const submitHandler = (data: JobFormData) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* Job Title */}
      <div>
        <label className="block font-medium">Job Title</label>
        <Controller
          name="jobTitle"
          control={control}
          rules={{ required: "Job title is required" }}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Software Engineer"
            />
          )}
        />
        {errors.jobTitle && (
          <p className="text-red-600 text-sm">{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label className="block font-medium">Company</label>
        <Controller
          name="company"
          control={control}
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Google"
            />
          )}
        />
        {errors.company && (
          <p className="text-red-600 text-sm">{errors.company.message}</p>
        )}
      </div>

      {/* Posting Link */}
      <div>
        <label className="block font-medium">Posting Link (optional)</label>
        <Controller
          name="postingLink"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., https://..."
              type="text"
            />
          )}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium">Status (optional)</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border rounded px-3 py-2">
              <option value="">Select status</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="withdrawn">Withdrew Application</option>
              <option value="rejected">Not Hired</option>
              <option value="noresponse">No Response from Employer</option>
            </select>
          )}
        />
      </div>

      {/* Date Applied */}
      <div>
        <label className="block font-medium">Date Applied (optional)</label>
        <Controller
          name="appliedDate"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              type="date"
            />
          )}
        />
      </div>

      {/* Date Rejected */}
      <div>
        <label className="block font-medium">Date Rejected (optional)</label>
        <Controller
          name="rejectedDate"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              type="date"
            />
          )}
        />
      </div>

      {/* Resume Version */}
      <div>
        <label className="block font-medium">Resume Version (optional)</label>
        <Controller
          name="resumeVersion"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Resume_v1"
            />
          )}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block font-medium">Notes (optional)</label>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Follow up in 2 weeks"
            />
          )}
        />
      </div>

      {/* Submit */}
      <button type="submit">Add Job</button>
    </form>
  );
}
