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

test("Validation of User data Schema", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      data: {
        name: "Test John Doe",
        email: "testuser@mail.com",
      },
    },
  );
  expect(response.status()).toBe(201);
  const responseBody = await response.json();

  expect(responseBody.name).toBe("Test John Doe");
  expect(responseBody.email).toBe("testuser@mail.com");
  expect(responseBody.id).toBeDefined();
});
