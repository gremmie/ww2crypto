import { expect, test } from "./fixtures.ts";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "menu" }).click();
  await page.getByRole("link", { name: "PURPLE" }).click();
  await page.getByRole("tab", { name: "Setup" }).click();
  await page.getByRole("textbox", { name: "Plugboard Wiring" }).click();
  await page
    .getByRole("textbox", { name: "Plugboard Wiring" })
    .fill("NOKT YUXEQLHBRMP dICJASVwGZF");
  await page.getByRole("button", { name: "Set", exact: true }).click();
  await page.getByRole("tab", { name: "Switches" }).click();
  await page.getByRole("combobox", { name: "Switch Order" }).click();
  await page.getByRole("option", { name: "2-3-1" }).click();
  await page.getByRole("tab", { name: "Operate" }).click();
  await page.getByRole("textbox", { name: "Sixes" }).click();
  await page.getByRole("textbox", { name: "Sixes" }).fill("9");
  await page.getByRole("textbox", { name: "Sixes" }).press("Tab");
  await page.getByRole("button", { name: "Increase" }).nth(1).click();
  await page.getByRole("button", { name: "Decrease" }).nth(1).click();
  await page.getByRole("textbox", { name: "Twenties #2" }).click();
  await page.getByRole("textbox", { name: "Twenties #2" }).fill("24");
  await page.getByRole("textbox", { name: "Twenties #2" }).press("Tab");
  await page.getByRole("button", { name: "Increase" }).nth(3).click();
  await page.getByRole("button", { name: "Increase" }).nth(3).click();
  await page.getByRole("button", { name: "Increase" }).nth(3).click();
  await page.getByRole("button", { name: "Increase" }).nth(3).click();
  await page.getByRole("button", { name: "Increase" }).nth(3).click();
  await page.getByRole("switch", { name: "Encrypt/Decrypt" }).check();
  await page.getByRole("textbox", { name: "Input" }).click();
  await page
    .getByRole("textbox", { name: "Input" })
    .fill("zTXODNWKCC MAVNZXYWEETUQTCIMNVEUVIWbLUAXRRTLVA");
  await page.getByRole("button", { name: "Format" }).click();
  await page.getByRole("button", { name: "select processing style" }).click();
  await page.getByRole("menuitem", { name: "Fast Decrypt" }).click();
  await page.getByRole("button", { name: "Fast Decrypt" }).click();
  await expect(page.getByLabel("Output")).toContainText(
    "FOVTATAKIDASINIMUIMINOMOXIWOIRUBESIFYXXFCKZZR",
  );
  await page.getByRole("button", { name: "Clear" }).nth(1).click();
  await page.getByRole("button", { name: "Clear" }).first().click();
  await page.getByRole("switch", { name: "Encrypt/Decrypt" }).uncheck();
  await page.getByRole("button", { name: "Reset Switches" }).click();
  await page.getByRole("textbox", { name: "Sixes" }).click();
  await page.getByRole("textbox", { name: "Sixes" }).fill("9");
  await page.getByRole("textbox", { name: "Twenties #2" }).click();
  await page.getByRole("textbox", { name: "Twenties #2" }).fill("24");
  await page.getByRole("textbox", { name: "Twenties #2" }).press("Tab");
  await page.getByRole("textbox", { name: "Twenties #3" }).fill("6");
  await page.getByRole("textbox", { name: "Twenties #3" }).press("Tab");
  await page.getByRole("textbox", { name: "Input" }).click();
  await page
    .getByRole("textbox", { name: "Input" })
    .fill("FOVTATAKIDASINIMUIMINOMOXIWOIRUBESIFYXXFCKZZR");
  await page.getByRole("button", { name: "Fast Encrypt" }).click();
  await expect(page.getByLabel("Output")).toContainText(
    "ZTXODNWKCCMAVNZXYWEETUQTCIMNVEUVIWBLUAXRRTLVA",
  );
});
