/**
 * @jest-environment node
 */
import { fetchUsers, fetchUser, fetchUsersWithActivity } from "@/lib/api";

const mockUsersData = [
  { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: { street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998-3874", geo: { lat: "-37.3159", lng: "81.1496" } }, phone: "1-770-736-0988 x56442", website: "hildegard.org", company: { name: "Romaguera-Crona", catchPhrase: "Multi-layered client-server neural-net", bs: "harness real-time e-markets" } },
  { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", address: { street: "Victor Plains", suite: "Suite 879", city: "Wisokyburgh", zipcode: "90566-7771", geo: { lat: "-43.9509", lng: "-34.4618" } }, phone: "010-692-6593 x09125", website: "anastasia.net", company: { name: "Deckow-Crist", catchPhrase: "Proactive didactic contingency", bs: "synergize" } },
];

const mockPostsData = [
  { userId: 1, id: 1, title: "Post 1", body: "body 1" },
  { userId: 1, id: 2, title: "Post 2", body: "body 2" },
  { userId: 2, id: 3, title: "Post 3", body: "body 3" },
];

const mockTodosData = [
  { userId: 1, id: 1, title: "Todo 1", completed: true },
  { userId: 1, id: 2, title: "Todo 2", completed: false },
  { userId: 1, id: 3, title: "Todo 3", completed: false },
  { userId: 2, id: 4, title: "Todo 4", completed: true },
];

global.fetch = jest.fn();

function mockFetch(data: unknown) {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

function mockFetchError(status = 500) {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({}),
  });
}

describe("API Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe("fetchUsers", () => {
    it("return users on success", async () => {
      mockFetch(mockUsersData);
      const users = await fetchUsers();
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe("Leanne Graham");
    });

    it("throw on HTTP error", async () => {
      mockFetchError(500);
      await expect(fetchUsers()).rejects.toThrow("Failed to fetch users: 500");
    });
  });

  describe("fetchUser", () => {
    it("return a single user", async () => {
      mockFetch(mockUsersData[0]);
      const user = await fetchUser(1);
      expect(user.id).toBe(1);
      expect(user.name).toBe("Leanne Graham");
    });

    it("throw on HTTP error", async () => {
      mockFetchError(404);
      await expect(fetchUser(999)).rejects.toThrow(
        "Failed to fetch user 999: 404",
      );
    });
  });

  describe("fetchUsersWithActivity", () => {
    it("enriches users with post and todo counts", async () => {
      mockFetch(mockUsersData); // users
      mockFetch(mockPostsData); // posts
      mockFetch(mockTodosData); // todos

      const users = await fetchUsersWithActivity();

      // User 1 has 2 posts
      expect(users[0].totalPosts).toBe(2);
      // User 1 has 1 completed, 2 pending
      expect(users[0].completedTodos).toBe(1);
      expect(users[0].pendingTodos).toBe(2);

      // User 2 has 1 post
      expect(users[1].totalPosts).toBe(1);
      // User 2 has 1 completed, 0 pending
      expect(users[1].completedTodos).toBe(1);
      expect(users[1].pendingTodos).toBe(0);
    });

    it("assign 0 count to user with no activity", async () => {
      const usersWithNoActivity = [mockUsersData[0]];
      mockFetch(usersWithNoActivity);
      mockFetch([]); // no posts
      mockFetch([]); // no todos

      const users = await fetchUsersWithActivity();
      expect(users[0].totalPosts).toBe(0);
      expect(users[0].completedTodos).toBe(0);
      expect(users[0].pendingTodos).toBe(0);
    });

    it("throw if users fetch fail", async () => {
      mockFetchError(500);
      await expect(fetchUsersWithActivity()).rejects.toThrow();
    });
  });
})