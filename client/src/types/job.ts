export type Job = {
  _id?: string;
  jobTitle: string;
  company: string;
  postingLink?: string;
  status?: string;
  appliedDate?: string;
  rejectedDate?: string;
  resumeVersion?: string;
  notes?: string;
};

export type JobLibraryHandle = {
  refresh: () => void;
};
