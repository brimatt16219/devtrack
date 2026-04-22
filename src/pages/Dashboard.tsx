import { useState, useMemo, useCallback } from "react";
import { useJobStore } from "../store/useJobStore";
import { useDebounce } from "../hooks/useDebounce";
import FilterBar from "../components/FilterBar";
import JobList from "../components/JobList";
import type { JobStatus } from "../types/job";
import StatsBar from "../components/StatsBar";

export default function Dashboard() {
  // throw new Error("Test error — Dashboard exploded");
  const jobs = useJobStore((state) => state.jobs);
  const deleteJob = useJobStore((state) => state.deleteJob);

  // Raw input values — update on every keystroke
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  // Debounced query — only updates 300ms after user stops typing
  // This is what we actually filter against
  const debouncedQuery = useDebounce(query, 300);

  // useCallback: stable reference across renders
  // deleteJob from Zustand is already stable, but wrapping it makes
  // the intent explicit and guards against future refactors
  const handleDelete = useCallback((id: string) => {
    deleteJob(id);
  }, [deleteJob]);

  // useMemo: only recomputes when jobs, debouncedQuery, or statusFilter changes
  // Without this, the filter runs on every render — including unrelated re-renders
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        debouncedQuery === "" ||
        job.company.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(debouncedQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [jobs, debouncedQuery, statusFilter]);

  return (
    <main className="app-main">
      <StatsBar jobs={jobs}/>
      <FilterBar
        query={query}
        status={statusFilter}
        onQueryChange={setQuery}
        onStatusChange={setStatusFilter}
        total={jobs.length}
        filtered={filteredJobs.length}
      />
      <JobList jobs={filteredJobs} onDelete={handleDelete} />
    </main>
  );
}