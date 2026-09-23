// @ts-check
import { test, expect } from "@playwright/test";

test("Create user using POST API request", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: {
        name: "Test John Doe",
        email: "testuser@mail.com",
      },
    },
  );
  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(201);
});
