import type { Job } from "../../types/job";

type JobCardProps = {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
};

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <div className="job-card">
      <div className="card-col card-left">
        <h3>{job.jobTitle}</h3>
        <span className="company">{job.company}</span>
        {job.postingLink && (
          <a
            href={job.postingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="job-link"
          >
            View Posting
          </a>
        )}
      </div>

      <div className="card-col">
        <div className="meta-group">
          <span>Status: {job.status || "N/A"}</span>
          <span>Applied: {job.appliedDate || "—"}</span>
          <span>Resume: {job.resumeVersion || "—"}</span>
        </div>
        {job.notes && <p className="notes">{job.notes}</p>}
      </div>

      <div className="card-col card-actions">
        <button onClick={onEdit}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
