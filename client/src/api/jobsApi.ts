import { Job } from "../types/job";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchJobs() {
  const response = await fetch(`${BASE_URL}/api/jobs`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return await response.json();
}

export async function addJob(job: Job) {
  const response = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add job");
  }
  return await response.json();
}

export async function updateJob(id: string, updatedJob: Omit<Job, "_id">) {
  const response = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedJob),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update job");
  }
  return await response.json();
}

export async function deleteJob(id: string) {
  const response = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete job");
  }
  return await response.json();
}
