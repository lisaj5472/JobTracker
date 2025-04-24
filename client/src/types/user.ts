export type EducationEntry = {
  degree: string;
  school: string;
  graduationDate?: string;
};

export type UserProfile = {
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  education: EducationEntry[];
  masterSkills?: string[];
};
