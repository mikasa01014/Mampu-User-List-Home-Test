/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserDetailCard } from "@/components/UserDetailCard";
import { mockUser, mockPosts, mockTodos } from "./fixtures";

describe("UserDetailCard", () => {
  describe("render user detail", () => {
    it("show user name", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });

    it("show username", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("@Bret")).toBeInTheDocument();
    });

    it("show email", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
    });

    it("show phone", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("1-770-736-0988 x56442")).toBeInTheDocument();
    });

    it("show website", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("hildegard.org")).toBeInTheDocument();
    });

    it("show company name", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
    });

    it("show company catchphrase", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(
        screen.getByText("Multi-layered client-server neural-net"),
      ).toBeInTheDocument();
    });

    it("show city and zipcode in address section", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("Gwenborough")).toBeInTheDocument();
      expect(screen.getByText("92998-3874")).toBeInTheDocument();
    });
  });

  describe("post sections", () => {
    it("render post lists", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByTestId("posts-list")).toBeInTheDocument();
    });

    it("show post title", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText(/sunt aut facere/i)).toBeInTheDocument();
    });

    it("show post count in header", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText(`(${mockPosts.length})`)).toBeInTheDocument();
    });

    it("show empty state message when no post", () => {
      render(<UserDetailCard user={mockUser} post={[]} todo={mockTodos} />);
      expect(screen.getByText("No post(s) yet")).toBeInTheDocument();
    });
  });

  describe("todo sections", () => {
    it("render todo lists", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByTestId("todos-list")).toBeInTheDocument();
    });

    it("show complete and pending badge counts", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      const completedCount = mockTodos.filter((t) => t.completed).length;
      const pendingCount = mockTodos.filter((t) => !t.completed).length;
      // The badges show counts like "2 done", "3 pending"
      expect(screen.getAllByText(`${completedCount} done`)).toHaveLength(2);
      expect(screen.getAllByText(`${pendingCount} pending`)).toHaveLength(2);
    });

    it("show todo title text", () => {
      render(
        <UserDetailCard user={mockUser} post={mockPosts} todo={mockTodos} />,
      );
      expect(screen.getByText("delectus aut autem")).toBeInTheDocument();
    });

    it("show empty state when no todo", () => {
      render(<UserDetailCard user={mockUser} post={mockPosts} todo={[]} />);
      expect(screen.getByText("No todo(s) yet.")).toBeInTheDocument();
    });
  });
});
