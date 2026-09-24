import { test, expect } from "@playwright/test";

test.describe("API Response Validation", () => {
  test("GET users data validation", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/users/",
    );

    expect(response.status()).toBe(200);

    const data = await response.json();
  });
});
