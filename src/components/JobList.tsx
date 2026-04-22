import { memo } from "react";
import type { Job } from "../types/job";
import JobCard from "./JobCard";

interface Props {
  jobs: Job[];
  onDelete: (id: string) => void;
}

const JobList = memo(function JobList({ jobs, onDelete }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No applications yet</p>
        <p className="empty-sub">Add your first job above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="job-list" role="list">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
});

export default JobList;