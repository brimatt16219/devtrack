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
          company: "Google",
          role: "Software Engineer I",
          status: "applied",
          appliedDate: "2025-04-01",
          location: "Sunnyvale, CA",
          salary: "$115k – $140k",
          notes: "Practice data structures and algorithms. Leetcode tagged Google.",
        },
        {
          id: "2",
          company: "Amazon",
          role: "New Grad Software Engineer",
          status: "applied",
          appliedDate: "2025-03-28",
          location: "Seattle, WA",
          salary: "$114k – $135k",
          notes: "Review AWS extensively. Practice and memorize STAR formatted responses for behavioral questions.",
        },
        {
          id: "3",
          company: "Uber",
          role: "Software Engineer I",
          status: "applied",
          appliedDate: "2025-03-20",
          location: "New York City, NY",
          notes: "HackerRank: DSA. Study leetcode questions tagged Uber.",
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