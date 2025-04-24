import { useEffect, useState } from "react";
import ResumeCard from "./ResumeCard";
import type { Resume } from "../../types/resume";
import { fetchResumes, deleteResume } from "../../api/resumeApi";

export default function ResumeLibrary() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  const showResumes = async () => {
    try {
      const data = await fetchResumes();
      setResumes(data);
    } catch (err) {
      console.error("❌ Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResume(id);
      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume._id !== id)
      );
    } catch (err) {
      console.error("❌ Failed to delete resume:", err);
    }
  };

  const handleNewResume = () => {
    alert("ResumeEditor not wired up yet!");
  };

  useEffect(() => {
    showResumes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Resumes</h2>
        <button onClick={handleNewResume}>+ New Resume</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : resumes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p>No resumes saved yet.</p>
      )}
    </div>
  );
}
