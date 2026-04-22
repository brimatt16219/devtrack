import { useState } from "react";
import { useJobStore } from "../store/useJobStore";
import { useJobSearch } from "../hooks/useJobSearch";
import type { Job } from "../types/job";

export default function Explore() {
  const [search, setSearch] = useState("");
  const addJob = useJobStore((state) => state.addJob);
  const { data, isLoading, isError, isFetching } = useJobSearch(search);

  function handleImport(remJob: {
    company_name: string;
    title: string;
    candidate_required_location: string;
    salary: string;
  }) {
    const job: Job = {
      id: crypto.randomUUID(),
      company: remJob.company_name,
      role: remJob.title,
      status: "applied",
      appliedDate: new Date().toISOString().split("T")[0],
      location: remJob.candidate_required_location || "Remote",
      salary: remJob.salary || "",
      notes: "",
    };
    addJob(job);
  }

  return (
    <main className="app-main">
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: 400, marginBottom: "8px" }}>
          Explore jobs
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "13px" }}>
          Search live remote jobs and import them straight to your tracker.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by role or keyword..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {/* Loading state */}
      {(isLoading || isFetching) && (
        <div className="explore-status">Fetching jobs...</div>
      )}

      {/* Error state */}
      {isError && (
        <div className="explore-status error">
          Could not load jobs. Check your connection and try again.
        </div>
      )}

      {/* Empty search prompt */}
      {!search && (
        <div className="explore-status">
          Type a role to search — try "React", "TypeScript", or "Go".
        </div>
      )}

      {/* Results */}
      {data && data.length === 0 && (
        <div className="explore-status">No results for "{search}".</div>
      )}

      {data && data.length > 0 && (
        <ul className="job-list" role="list">
          {data.map((job) => (
            <li key={job.id}>
              <article className="job-card">
                <div className="job-card-header">
                  <div className="job-card-meta">
                    <h2 className="job-company">{job.company_name}</h2>
                    <p className="job-role">{job.title}</p>
                  </div>
                </div>
                <div className="job-card-details">
                  <span className="detail-item">
                    <span className="detail-icon">&#9679;</span>
                    {job.candidate_required_location || "Remote"}
                  </span>
                  {job.salary && (
                    <span className="detail-item">
                      <span className="detail-icon">&#9679;</span>
                      {job.salary}
                    </span>
                  )}
                </div>
                <button className="btn-primary" style={{ marginTop: "10px", fontSize: "12px", padding: "6px 14px" }}
                  onClick={() => handleImport(job)}
                >
                  + Import to tracker
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}