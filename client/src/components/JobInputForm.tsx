import { useForm, Controller } from "react-hook-form";

type JobFormData = {
  jobTitle: string;
  company: string;
  postingLink?: string;
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
    defaultValues: { jobTitle: "", company: "", postingLink: "" },
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

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Job
      </button>
    </form>
  );
}
