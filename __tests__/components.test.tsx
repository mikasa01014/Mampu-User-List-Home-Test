/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SkeletonTable, SkeletonCard, SkeletonMobileCard } from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ActivityBadges } from "@/components/ActivityBadges";


describe("Skeleton components", () => {
  it("SkeletonTable render correct number of rows", () => {
    render(
      <table>
        <SkeletonTable rows={5} />
      </table>,
    );
    expect(screen.getByTestId("skeleton-table")).toBeInTheDocument();
  });

  it("SkeletonCard render", () => {
    render(<SkeletonCard />);
    expect(screen.getByTestId("skeleton-card")).toBeInTheDocument()
  })

  it("SkeletonMobileCard render correct count", () => {
    render(<SkeletonMobileCard count={3} />);
    expect(screen.getByTestId("skeleton-mobile")).toBeInTheDocument();
  });
})

describe("EmptyState", () => {
  it("render with default title and message", () => {
    render(<EmptyState />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No result found")).toBeInTheDocument();
  })

  it("render custom title and message", () => {
    render(<EmptyState title="Custom Title" message="Custom message here" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message here")).toBeInTheDocument();
  });

  it("render action when provided", () => {
    render(<EmptyState action={<button>Reset</button>} />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("has correct ARIA role for live region", () => {
    render(<EmptyState />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
})

describe("ErrorState", () =>  {
  it("renders error message", () => {
    render(<ErrorState message="Network failure" />);
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
    expect(screen.getByText("Network failure")).toBeInTheDocument();
  });

  it("has correct alert role", () => {
    render(<ErrorState message="Error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
})

describe("ActivityBadges", () => {
   it("render all three badge types", () => {
    render(
      <ActivityBadges
        totalPosts={10}
        completedTodos={8}
        pendingTodos={3}
      />
    );
    expect(screen.getByTestId("activity-badges")).toBeInTheDocument();
  });
  
  it("show zero pending as neutral style when pending is 0", () => {
    render(
      <ActivityBadges
        totalPosts={5}
        completedTodos={4}
        pendingTodos={0}
      />
    );
    expect(screen.getByTitle("No pending todo(s)")).toBeInTheDocument();
  });

  it("show amber style when there are pending todos", () => {
    render(
      <ActivityBadges totalPosts={5} completedTodos={4} pendingTodos={2} />,
    );
    expect(screen.getByTitle("Pending todo(s)")).toBeInTheDocument();
  });
})