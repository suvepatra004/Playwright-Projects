/**
 * @author Suvendu Kumar Patra
 * GET, POST, PUT, DELETE /api/users
 */
import { test, expect } from "@playwright/test";

test.describe("GET /api/users endpoint validation", () => {
  test("Verify 200 status code", async ({ request }) => {
    const response = await request.get("/api/users/");

    expect(response.status()).toBe(200);
    expect(response.ok).toBeTruthy();
  });
  test("Verify the response Content-Type is application/json", () => {});
  test("Verify the response body is valid JSON.", async ({request}) => {
    const response = await request.get("/api/users/");
    const responseBody = response.json();

    expect(responseBody).toBeDefined();
  });
});
