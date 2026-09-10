import { expect, test } from "@playwright/test";

test("Validate drag n drop", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Drag and Drop" }).click();
});
