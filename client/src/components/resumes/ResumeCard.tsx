import type { Resume } from "../../types/resume";

type Props = {
  resume: Resume;
  onDelete: (id: string) => void;
};

export default function ResumeCard({ resume, onDelete }: Props) {
  return (
    <div className="border-2 border-gold p-4 rounded shadow bg-white text-left">
      <h3 className="text-xl font-bold">{resume.name}</h3>
      <p className="text-sm text-gray-600">
        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => alert("Edit Resume (not wired up)")}>
          Edit
        </button>
        <button onClick={() => alert("Generate ATS Resume")}>
          Generate ATS
        </button>
        <button onClick={() => alert("Download PDF")}>Download</button>
        <button onClick={() => onDelete(resume._id)}>Delete</button>
      </div>
    </div>
  );
}
