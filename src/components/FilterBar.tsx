import type { JobStatus } from "../types/job";

interface Props {
    query: string;
    status: JobStatus | "all";
    onQueryChange: (q: string) => void;
    onStatusChange: (s: JobStatus | "all") => void;
    total: number;
    filtered: number;
}

export default function FilterBar({
    query,
    status,
    onQueryChange,
    onStatusChange,
    total,
    filtered,
}: Props ) {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search company or role..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                style={{ flex: 1 }}
            />

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value as JobStatus | "all")}
                style={{ width: "160px" }}
            >
                <option value="all">All statuses</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>

            <span className="filter-count">
                {filtered === total
                ? `${total} applications`
                : `${filtered} of ${total}`}
            </span>
        </div>
    );
}