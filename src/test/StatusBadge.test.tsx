import { render, screen } from "@testing-library/react";
import StatusBadge from "../components/StatusBadge";

// describe groups related tests together
describe("StatusBadge", () => {

  it("renders the correct label for each status", () => {
    // Test 1: applied
    const { rerender } = render(<StatusBadge status="applied" />);
    expect(screen.getByText("Applied")).toBeInTheDocument();

    // rerender lets you change props without unmounting
    rerender(<StatusBadge status="interviewing" />);
    expect(screen.getByText("Interviewing")).toBeInTheDocument();

    rerender(<StatusBadge status="offer" />);
    expect(screen.getByText("Offer")).toBeInTheDocument();

    rerender(<StatusBadge status="rejected" />);
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("applies the correct CSS class for each status", () => {
    const { rerender } = render(<StatusBadge status="applied" />);
    expect(screen.getByText("Applied")).toHaveClass("badge-applied");

    rerender(<StatusBadge status="offer" />);
    expect(screen.getByText("Offer")).toHaveClass("badge-offer");
  });
});