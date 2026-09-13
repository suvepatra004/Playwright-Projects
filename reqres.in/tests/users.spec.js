/**
 * GET, POST, PUT, DELETE /api/users
 *
 */

import { test, expect } from "@playwright/test";

test.describe("/api/users endpoint validation", () => {
  test("Verify the status code is 200", async ({ request }) => {
    const response = await request.get("/api/users/2");
    expect(response.status()).toBe(200);
  });
});
