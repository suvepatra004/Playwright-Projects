// @ts-check
import { test, expect } from "@playwright/test";

test("Update user using PUT API request", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      data: {
        name: "Suvendu Patra",
        username: "suveraj",
        email: "suve@mail.com",
      },
    },
  );
  const responseBody = await response.json();
  console.log(responseBody);
  console.log("Status Code: " + response.status());
  expect(response.status()).toBe(200);
});
