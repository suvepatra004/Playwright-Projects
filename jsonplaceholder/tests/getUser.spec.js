// @ts-check
import { test, expect } from "@playwright/test";

test("JSONPlaceHolder page validation", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  console.log(await response.json());

  expect(response.status()).toBe(200);
  expect(response.ok).toBeTruthy();
});

test("Validate the count of User Data", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  // Validate the status code
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  // console.log("Users:", data);
  console.log("Users:", JSON.stringify(data, null, 2));

  // Validate array of objects
  expect(Array.isArray(data)).toBeTruthy();
  // Validate the count of user data
  expect(data.length).toBe(10);
});

test("Validate the First User", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users",
  );

  const data = await response.json();
  const firstUser = data[0];

  expect(firstUser).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: expect.objectContaining({
        street: expect.any(String),
        suite: expect.any(String),
        geo: expect.objectContaining({
          lat: expect.any(String),
          lng: expect.any(String),
        }),
      }),
      website: expect.any(String),
    }),
  );
});
