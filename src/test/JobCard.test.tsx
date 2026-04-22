import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import JobCard from "../components/JobCard";
import type { Job } from "../types/job";

// JobCard uses useNavigate internally, so it must be wrapped in a router
// MemoryRouter is the test-friendly version of BrowserRouter — no real URLs needed
const mockJob: Job = {
  id: "test-1",
  company: "True Anomaly",
  role: "Software Engineer I",
  status: "interviewing",
  appliedDate: "2025-04-01",
  location: "Denver, CO",
  salary: "$115k – $140k",
  notes: "Capstone project next.",
};

describe("JobCard", () => {

  it("renders job details from props", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} onDelete={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("True Anomaly")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer I")).toBeInTheDocument();
    expect(screen.getByText("Denver, CO")).toBeInTheDocument();
    expect(screen.getByText("Interviewing")).toBeInTheDocument();
  });

  it("calls onDelete with the job id when Remove is clicked", async () => {
    // userEvent simulates real browser interaction (vs fireEvent which is lower level)
    const user = userEvent.setup();

    // vi.fn() creates a mock function that records how it was called
    const handleDelete = vi.fn();

    render(
      <MemoryRouter>
        <JobCard job={mockJob} onDelete={handleDelete} />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Remove"));

    // Assert the mock was called once with the right id
    expect(handleDelete).toHaveBeenCalledOnce();
    expect(handleDelete).toHaveBeenCalledWith("test-1");
  });

  it("does not render salary if not provided", () => {
    const jobWithoutSalary = { ...mockJob, salary: "" };
    render(
      <MemoryRouter>
        <JobCard job={jobWithoutSalary} onDelete={() => {}} />
      </MemoryRouter>
    );
    expect(screen.queryByText("$115k – $140k")).not.toBeInTheDocument();
  });
});