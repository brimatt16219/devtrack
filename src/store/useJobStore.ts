import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Job } from "../types/job";

interface JobStore {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (updated: Job) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>()(
  // persist middleware replaces your useLocalStorage hook —
  // Zustand handles reading/writing localStorage automatically
  persist(
    (set) => ({
      jobs: [
        {
          id: "1",
          company: "True Anomaly",
          role: "Software Engineer I — Full Stack",
          status: "interviewing",
          appliedDate: "2025-04-01",
          location: "Denver, CO",
          salary: "$115k – $140k",
          notes: "Three-week learning roadmap. React/Elixir focus.",
        },
        {
          id: "2",
          company: "USAA",
          role: "Entry-Level SDE",
          status: "applied",
          appliedDate: "2025-03-28",
          location: "Remote",
          salary: "$95k – $115k",
          notes: "Review Kubernetes and Golang before phone screen.",
        },
        {
          id: "3",
          company: "MeridianLink",
          role: "Software Engineer I",
          status: "applied",
          appliedDate: "2025-03-20",
          location: "Remote",
          notes: "HackerRank: C# + React. Recruiter is Julie Andersen.",
        },
      ],

      addJob: (job) =>
        set((state) => ({ jobs: [job, ...state.jobs] })),

      updateJob: (updated) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === updated.id ? updated : j)),
        })),

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),
    }),
    { name: "devtrack-jobs" } // localStorage key
  )
);