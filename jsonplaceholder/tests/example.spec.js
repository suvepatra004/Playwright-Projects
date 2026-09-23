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
