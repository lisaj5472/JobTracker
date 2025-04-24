import { useState } from "react";
import ResumeLibrary from "../components/resumes/ResumeLibrary";
import ResumeBuilder from "../components/resumes/ResumeBuilder";

export default function ResumePage() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleOpenBuilder = () => setIsBuilderOpen(true);
  const handleCloseBuilder = () => setIsBuilderOpen(false);

  const handleParsedResume = (parsedData: {
    summary?: string;
    experience?: string[];
    education?: string[];
    skills?: string[];
  }) => {
    console.log("Parsed resume data received:", parsedData);
    // You can later pass this to ResumeEditor
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resumes</h1>
        <button onClick={handleOpenBuilder}>Upload Resume</button>
      </header>

      <ResumeLibrary />

      <ResumeBuilder
        isOpen={isBuilderOpen}
        onClose={handleCloseBuilder}
        onParsed={handleParsedResume}
      />
    </div>
  );
}
