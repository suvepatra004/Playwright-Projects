import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Challenging DOM" }).click();
  await page.locator("body").click();
});
