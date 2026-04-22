import { useQuery } from "@tanstack/react-query";

interface RemotiveJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    candidate_required_location: string;
    salary: string;
    job_type: string;
}

interface RemotiveResponse {
    jobs: RemotiveJob[];
}

async function fetchRemotiveJobs(search: string): Promise<RemotiveJob[]> {
    const url = `https://remotive.com/api/remote-jobs?category=software-dev&search=${encodeURIComponent(search)}&limit=8`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    const data: RemotiveResponse = await res.json();
    return data.jobs;
}

export function useJobSearch(search: string) {
    return useQuery({
        queryKey: ["remotive-jobs", search], // cache key — refetches when search changes
        queryFn: () => fetchRemotiveJobs(search),
        enabled: search.length > 1,  // don't fetch until user types something
        staleTime: 1000 * 60 * 5,   // treat data as fresh for 5 minutes
    })
}