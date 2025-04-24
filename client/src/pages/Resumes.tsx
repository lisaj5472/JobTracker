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
    <div className="home-container">
      {/* Sidebar Menu */}
      <aside className="sidebar">
        <nav className="menu">
          <button onClick={handleOpenBuilder}>Upload Resume</button>
        </nav>
        <ResumeBuilder
          isOpen={isBuilderOpen}
          onClose={handleCloseBuilder}
          onParsed={handleParsedResume}
        />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <ResumeLibrary />
      </main>
    </div>
  );
}
