import type { JobStatus } from '../types/job';

interface Props {
    status: JobStatus;
}

const config: Record<JobStatus, { label: string; className: string }> = {
    applied:      { label: "Applied",      className: "badge-applied" },
    interviewing: { label: "Interviewing", className: "badge-interviewing" },
    offer:        { label: "Offer",        className: "badge-offer" },
    rejected:     { label: "Rejected",     className: "badge-rejected" },

};
export default function StatusBadge({ status }: Props) {
    const { label, className } = config[status];
    return <span className={`badge ${className}`}>{label}</span>;
}