import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../types/job";
import StatusBadge from "./StatusBadge";

interface Props {
  job: Job;
  onDelete: (id: string) => void;
}

// memo: skip re-rendering if props haven't changed
// React does a shallow comparison — same job reference + same onDelete reference = no re-render
const JobCard = memo(function JobCard({ job, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <article className="job-card">
      <div
        className="job-card-header"
        onClick={() => navigate(`/jobs/${job.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="job-card-meta">
          <h2 className="job-company">{job.company}</h2>
          <p className="job-role">{job.role}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="job-card-details">
        <span className="detail-item">
          <span className="detail-icon">&#9679;</span>
          {job.location}
        </span>
        <span className="detail-item">
          <span className="detail-icon">&#9679;</span>
          {new Date(job.appliedDate).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })}
        </span>
        {job.salary && (
          <span className="detail-item">
            <span className="detail-icon">&#9679;</span>
            {job.salary}
          </span>
        )}
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(job.id);
        }}
      >
        Remove
      </button>
    </article>
  );
});

export default JobCard;