import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onEdit: (updated: string) => void;
  onSave: () => void;
};

export default function ResumeEditor({
  isOpen,
  onClose,
  content,
  onEdit,
  onSave,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative z-10 w-full max-w-3xl bg-white p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto">
          {/* Fixed Nav Bar */}
          <div className="sticky top-0 left-0 right-0 bg-white shadow-md z-20 p-3">
            <DialogTitle className="text-xl font-bold">
              Parsed Resume Text
            </DialogTitle>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">
                Review your parsed resume below.
              </span>
              <div className="space-x-2">
                <button onClick={onClose} className="text-blue-600">
                  Cancel
                </button>
                <button onClick={onSave} className="text-green-600">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Parsed content */}
          <textarea
            value={content}
            onChange={(e) => onEdit(e.target.value)}
            className="w-full h-[60vh] p-3 text-sm border border-gray-300 rounded whitespace-pre-wrap font-mono"
            spellCheck={false}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
