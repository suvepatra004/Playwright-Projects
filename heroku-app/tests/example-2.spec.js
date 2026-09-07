import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Challenging DOM" }).click();
  await page.locator("body").click();
  await page.getByRole("link", { name: "Redirect Link" }).click();
  await page.getByRole("link", { name: "here" }).click();
  await page.getByRole("link", { name: "200" }).click();
  await page.getByRole("link", { name: "here" }).click();
  await page.getByRole("link", { name: "301" }).click();
  await page.getByRole("link", { name: "here" }).click();
  await page.getByRole("link", { name: "404" }).click();
  await page.getByRole("link", { name: "here" }).click();
  await page.getByRole("link", { name: "500" }).click();
  await page.getByRole("link", { name: "here" }).click();
});
