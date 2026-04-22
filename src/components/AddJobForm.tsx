import { useState, useRef, useEffect } from "react";
import type { Job, JobStatus } from "../types/job";

interface Props {
  onAdd: (job: Job) => void;
}

interface FormState {
  company: string;
  role: string;
  status: JobStatus;
  location: string;
  salary: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  company: "",
  role: "",
  status: "applied",
  location: "",
  salary: "",
  notes: "",
};

export default function AddJobForm({ onAdd }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [expanded, setExpanded] = useState(false);

  // 1. Create the ref — starts as null until the input mounts
  const companyRef = useRef<HTMLInputElement>(null);

  // 2. When expanded becomes true, focus the input
  // The dependency array [expanded] means this runs whenever expanded changes
  useEffect(() => {
    if (expanded) {
      // Small timeout lets the DOM finish rendering before we focus
      const timer = setTimeout(() => companyRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [expanded]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      appliedDate: new Date().toISOString().split("T")[0],
      ...form,
    });
    setForm(EMPTY_FORM);
    setExpanded(false);
  }

  return (
    <div className="add-form-wrapper">
      {!expanded ? (
        <button className="add-trigger" onClick={() => setExpanded(true)}>
          + Add application
        </button>
      ) : (
        <form className="add-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              {/* 3. Attach the ref to the input element */}
              <input
                ref={companyRef}
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Anthropic"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <input
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Software Engineer I"
                required
              />
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
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Remote / San Francisco"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary range</label>
              <input
                id="salary"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="$120k – $150k"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Recruiter contact, next steps..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save application</button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => { setExpanded(false); setForm(EMPTY_FORM); }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}