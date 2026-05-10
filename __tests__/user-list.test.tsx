/**
 * @jest-environment jsdom
 */
import React, { Suspense } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UsersTable } from "@/components/UserTable";
import { mockUsers } from "./fixtures";

// Mock Next.js navigation
const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/users",
}));

function renderTable(users = mockUsers) {
  return render(
    <Suspense fallback={<div>Loading</div>}>
      <UsersTable users={users} />
    </Suspense>,
  );
}

describe("UserTable", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockPush.mockClear();
  });

  describe("render users with activity signal", () => {
    it("render all users by default", () => {
      renderTable();
      expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Clementine Bauch").length).toBeGreaterThan(0);
    });

    it("show activity badges on mobile cards", () => {
      renderTable();
      const badges = screen.getAllByTestId("activity-badges");
      expect(badges.length).toBeGreaterThan(0);
    });

    it("display user count summary", () => {
      renderTable();
      expect(screen.getByText(/Showing/)).toBeInTheDocument();
      expect(screen.getByTestId("filtered-count")).toHaveTextContent("3");
    });

    it("renders email addresses for users", () => {
      renderTable();
      expect(screen.getAllByText("Sincere@april.biz").length).toBeGreaterThan(
        0,
      );
    });
  });

  describe("search filter", () => {
    it("filter by user name", () => {
      renderTable();
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "Leanne" } });
      expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThan(0);
    });

    it("filter by email", () => {
      renderTable();
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "Shanna@melissa.tv" } });
      expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThan(0);
    });

    it("show empty state when no result match", () => {
      renderTable();
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, {
        target: { value: "zzzznonexistentuser12345" },
      });
      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });

    it("show correct count after filtering", () => {
      renderTable();
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "Leanne" } });
      expect(screen.getByText("1", { selector: "strong" })).toBeInTheDocument();
    });
  });

  describe("additional filter - activity", () => {
    it("render the filter select", () => {
      renderTable();
      expect(screen.getByTestId("filter-select")).toBeInTheDocument();
    });

    it("filter to users with pending todo(s)", () => {
      renderTable();
      const filterSelect = screen.getByTestId("filter-select");
      fireEvent.change(filterSelect, { target: { value: "hasPending" } });
      // Clementine has 0 pending, so she should not appear in mobile cards
      // (Leanne=5 pending, Ervin=2 pending, Clementine=0 pending)
      const mobileCards = screen.queryAllByTestId("user-card-3");
      expect(mobileCards.length).toBe(0);
    });

    it("filter out users with no completed todo(s) show correct subset", () => {
      renderTable();
      const filterSelect = screen.getByTestId("filter-select");
      fireEvent.change(filterSelect, { target: { value: "noCompleted" } });
      // All mock users have completedTodos > 0, so empty state should appear
      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });

    it("show all users when filter is 'all'", () => {
      renderTable();
      const filterSelect = screen.getByTestId("filter-select");
      fireEvent.change(filterSelect, { target: { value: "all" } });
      expect(screen.getByTestId("filtered-count")).toHaveTextContent("3");
      expect(screen.getByTestId("total-count")).toHaveTextContent("3");
    });
  });

  describe("sorting", () => {
    it("render sort buttons in desktop table headers", () => {
      renderTable();
      expect(screen.getByTestId("sort-name")).toBeInTheDocument();
      expect(screen.getByTestId("sort-totalPosts")).toBeInTheDocument();
      expect(screen.getByTestId("sort-pendingTodos")).toBeInTheDocument();
      expect(screen.getByTestId("sort-completedTodos")).toBeInTheDocument();
    });

    it("clicking a sort button triggers URL update", () => {
      renderTable();
      const sortBtn = screen.getByTestId("sort-pendingTodos");
      fireEvent.click(sortBtn);
      expect(mockReplace).toHaveBeenCalled();
    });


  });

  describe("clear filter", () => {
    it("show clear filters button when filters are active", () => {
      renderTable();
      const input = screen.getByTestId("search-input");
      fireEvent.change(input, { target: { value: "test" } });
      expect(screen.getByTestId("clear-filters")).toBeInTheDocument();
    });
  });

  describe("empty user lists", () => {
    it("show empty state when no user exist", () => {
      renderTable([]);
      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });
  });
});
