export type Resume = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sections: {
    summary?: string;
    experience?: string[];
    education?: string[];
    skills?: string[];
  };
};
