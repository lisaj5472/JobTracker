import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UploadResume from "./UploadResume";
import mammoth from "mammoth";
import ResumeEditor from "./ResumeEditor";
import { parseResumeToFields } from "../../utils/resumeParser";

type ResumeBuilderProps = {
  isOpen: boolean;
  onClose: () => void;
  onParsed: (parsedData: {
    summary?: string;
    experience?: string[];
    education?: string[];
    skills?: string[];
  }) => void;
};

export default function ResumeBuilder({
  isOpen,
  onClose,
  onParsed,
}: ResumeBuilderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string>("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleParse = async () => {
    if (!file) return;

    setParsing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;
      setParsedText(text);
      setParsing(false);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error("Error parsing file:", err);
      setError("Failed to parse the file.");
      setParsing(false);
    }
  };

  const handleSaveParsed = () => {
    const structured = parseResumeToFields(parsedText);
    onParsed(structured);
    setIsPreviewOpen(false);
    onClose();
  };

  const handleCloseAndReset = () => {
    setFile(null);
    setParsedText("");
    setError(null);
    onClose(); // call parent handler to close modal
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        <DialogPanel className="relative z-10 w-full max-w-xl bg-white p-6 rounded shadow-lg">
          <DialogTitle className="text-xl font-bold mb-4">
            Upload Resume File
          </DialogTitle>

          <UploadResume
            onFileSelect={(file) => {
              setFile(file);
              setParsedText("");
              setError(null);
            }}
          />
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={handleParse} disabled={parsing || !file}>
              {parsing ? "Parsing..." : "Continue to Editor"}
            </button>

            <ResumeEditor
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
              content={parsedText}
              onEdit={(updated) => setParsedText(updated)}
              onSave={handleSaveParsed}
            />

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <button onClick={handleCloseAndReset}>Cancel</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
