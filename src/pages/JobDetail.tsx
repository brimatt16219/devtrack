import { useParams, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useJobStore } from "../store/useJobStore";
import type { Job, JobStatus } from "../types/job";
import StatusBadge from "../components/StatusBadge";

type Action =
  | { type: "SET_FIELD"; field: keyof Job; value: string }
  | { type: "RESET"; job: Job };

function reducer(state: Job, action: Action): Job {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.job;
    default:
      return state;
  }
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const jobs = useJobStore((state) => state.jobs);
  const updateJob = useJobStore((state) => state.updateJob);
  const job = jobs.find((j) => j.id === id);

  const [form, dispatch] = useReducer(reducer, job ?? ({} as Job));

  if (!job) {
    return (
      <main className="app-main">
        <p style={{ color: "var(--muted)" }}>Job not found.</p>
      </main>
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    dispatch({ type: "SET_FIELD", field: e.target.name as keyof Job, value: e.target.value });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateJob(form);
    navigate("/dashboard");
  }

  function handleReset() {
    dispatch({ type: "RESET", job : job!});
  }

  return (
    <main className="app-main">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button className="btn-ghost" onClick={() => navigate("/dashboard")}>← Back</button>
        <StatusBadge status={form.status as JobStatus} />
      </div>

      <form className="add-form" onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" value={form.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input id="role" name="role" value={form.role} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary range</label>
            <input id="salary" name="salary" value={form.salary ?? ""} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save changes</button>
          <button type="button" className="btn-ghost" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </main>
  );
}