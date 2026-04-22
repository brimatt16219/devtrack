import { useNavigate } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";
import AddJobForm from "../components/AddJobForm";
import type { Job } from "../types/job";

export default function AddJob() {
  const addJob = useJobStore((state) => state.addJob);
  const navigate = useNavigate();

  function handleAdd(job: Job) {
    addJob(job);
    navigate("/dashboard");
  }

  return (
    <main className="app-main">
      <AddJobForm onAdd={handleAdd} />
    </main>
  );
}