export type JobStatus = "applied" | "interviewing" | "offer" | "rejected";

export interface Job {
    id: string;
    company: string;
    role: string;
    status: JobStatus;
    appliedDate: string;
    notes: string;
    location: string;
    salary?: string;
}