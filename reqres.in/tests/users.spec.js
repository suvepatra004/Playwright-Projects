/**
 * @author Suvendu Kumar Patra
 * GET, POST, PUT, DELETE /api/users
 */
import { test, expect } from "@playwright/test";

test.describe("/api/users endpoint validation", () => {
  test("Verify the status code is 200", async ({ request }) => {
    const response = await request.get("/api/users/3");
    console.log("Status:", response.status());
    console.log("Status text:", response.statusText());
    console.log("URL:", response.url());

    const body = await response.text();
    console.log("Response body:", body);
    expect(response.status()).toBe(200);
  });

  test("Verify status code is 404", async ({ request }) => {
    const response = await request.get("/api/users/90");
    console.log("Status:", response.status());
    console.log("Status text:", response.statusText());
    console.log("URL:", response.url());

    const body = await response.text();
    console.log("Response body:", body);
    expect(response.status()).toBe(404);
  });

  test("should first", () => {});
});
