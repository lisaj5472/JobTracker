import { useState, ChangeEvent } from "react";

type UploadResumeProps = {
  onFileSelect: (file: File) => void;
  resetTrigger?: boolean;
};

export default function UploadResume({ onFileSelect }: UploadResumeProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="resume-upload"
        className="inline-block cursor-pointer bg-transparent text-[var(--gold)] border-2 border-[var(--gold)] font-semibold py-2 px-5 text-sm uppercase tracking-wide text-center transition-colors duration-300 hover:bg-[var(--gold)] hover:text-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
      >
        Choose File
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {fileName && (
        <p className="mt-2 text-sm text-gray-700">
          Selected file: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
}
