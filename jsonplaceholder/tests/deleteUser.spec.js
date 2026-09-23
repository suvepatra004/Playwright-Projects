// @ts-check
import { test, expect } from "@playwright/test";

test("Update user using PUT API request", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/users/1",
  );
  console.log("Response Status Code: " + response.status());
  expect(response.status()).toBe(200);
});
