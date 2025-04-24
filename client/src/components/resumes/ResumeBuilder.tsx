import { useState } from "react";
import { Dialog } from "@headlessui/react"; // or your modal library of choice

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setParsedText(""); // clear previous
      setError(null);
    }
  };

  const handleParse = async () => {
    if (!file) return;

    setParsing(true);
    setError(null);

    try {
      // TEMP placeholder — we'll replace this with mammoth/pdf-parse logic
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setParsedText(text.slice(0, 500) + "..."); // Truncate for demo
        setParsing(false);
      };
      reader.readAsText(file); // Only works well for .txt or .docx (XML-based)

      // Parsing logic goes here later (docx via mammoth, pdf via API/server)
    } catch (err) {
      setError("Failed to parse the file.");
      setParsing(false);
    }
  };

  const handleContinue = () => {
    // TEMP: send stub data forward — replace with parsed structure
    onParsed({
      summary: parsedText.slice(0, 300),
      experience: ["Parsed Experience Block A", "Block B"],
      education: ["Parsed Education A"],
      skills: ["React", "MongoDB"],
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white p-6 rounded shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">
            Upload Resume File
          </Dialog.Title>

          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

          <button onClick={handleParse} className="mt-4">
            {parsing ? "Parsing..." : "Extract Text"}
          </button>

          {parsedText && (
            <textarea
              readOnly
              value={parsedText}
              className="w-full mt-4 p-2 border border-gray-300 rounded"
              rows={8}
            />
          )}

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleContinue} disabled={!parsedText}>
              Continue to Editor
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
