import { Resume } from "../types/resume";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchResumes() {
  const response = await fetch(`${BASE_URL}/api/resumes`);
  if (!response.ok) throw new Error("Failed to fetch resumes");
  return await response.json();
}

export async function addResume(resume: Resume) {
  const response = await fetch(`${BASE_URL}/api/resumes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resume),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add resume");
  }
  return await response.json();
}

export async function updateResume(
  id: string,
  updatedResume: Omit<Resume, "_id">
) {
  const response = await fetch(`${BASE_URL}/api/resumes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedResume),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update resume");
  }
  return await response.json();
}

export async function deleteResume(id: string) {
  const response = await fetch(`${BASE_URL}/api/resumes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete resume");
  }
  return await response.json();
}
