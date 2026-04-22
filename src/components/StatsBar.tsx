import { useMemo } from "react";
import type { Job } from "../types/job";

interface Props {
  jobs: Job[];
}

export default function StatsBar({ jobs }: Props) {
  // Each stat is derived — no useState anywhere
  // useMemo means these only recompute when jobs array changes
  const stats = useMemo(() => {
    const total = jobs.length;
    const interviewing = jobs.filter((j) => j.status === "interviewing").length;
    const offers = jobs.filter((j) => j.status === "offer").length;
    const rejected = jobs.filter((j) => j.status === "rejected").length;
    const responseRate = total === 0
      ? 0
      : Math.round(((interviewing + offers + rejected) / total) * 100);

    return { total, interviewing, offers, responseRate };
  }, [jobs]);

  return (
    <div className="stats-bar">
      <StatCard label="Applications" value={stats.total} />
      <StatCard label="Interviewing" value={stats.interviewing} accent />
      <StatCard label="Offers" value={stats.offers} accent />
      <StatCard
        label="Response rate"
        value={`${stats.responseRate}%`}
      />
    </div>
  );
}

// Small presentational sub-component — no logic, just display
function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className={`stat-num ${accent ? "stat-accent" : ""}`}>
        {value}
      </span>
    </div>
  );
}