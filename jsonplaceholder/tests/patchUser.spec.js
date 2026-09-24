// @ts-check
import { test, expect } from "@playwright/test";

test("Update user using PUT API request", async ({ request }) => {
  const response = await request.patch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        email: "suve@mail.com",
      },
    },
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody.email).toBe("suve@mail.com");
});
