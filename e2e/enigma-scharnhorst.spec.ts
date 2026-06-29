import { expect, Page, test } from "./fixtures.ts";

test.describe("Enigma Scharnhorst decrypt", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "menu" }).click();
    await page.getByRole("link", { name: "Enigma" }).click();

    await page.getByRole("tab", { name: "Setup" }).click();
    await page.getByRole("link", { name: "Next" }).click();

    await page.getByRole("combobox", { name: "Reflector" }).click();
    await page.getByRole("option", { name: "B" }).click();
    await page.getByRole("combobox", { name: "Rotor 1" }).click();
    await page.getByRole("option", { name: "III", exact: true }).click();
    await page.getByRole("combobox", { name: "Rotor 2" }).click();
    await page.getByRole("option", { name: "VI", exact: true }).click();
    await page.getByRole("combobox", { name: "Rotor 3" }).click();
    await page.getByRole("option", { name: "VIII" }).click();
    await page.getByRole("link", { name: "Next" }).click();

    await page.getByRole("radio", { name: "Letters" }).check();
    await page.getByRole("combobox", { name: "Rotor 1" }).click();
    await page.getByRole("option", { name: "A" }).click();
    await page.getByRole("combobox", { name: "Rotor 2" }).click();
    await page.getByRole("option", { name: "H" }).click();
    await page.getByRole("combobox", { name: "Rotor 3" }).click();
    await page.getByRole("option", { name: "M" }).click();
    await page.getByRole("link", { name: "Next" }).click();

    await page.getByRole("textbox", { name: "Connection String" }).click();
    await page
      .getByRole("textbox", { name: "Connection String" })
      .fill("AN EZ HK IJ LR MQ OT PV SW UX");
    await page.getByRole("button", { name: "Set", exact: true }).click();
    await page.getByRole("link", { name: "operate", exact: true }).click();

    await page.getByRole("textbox", { name: "rotor window 0" }).click();
    await page.getByRole("textbox", { name: "rotor window 0" }).fill("u");

    await page.getByRole("textbox", { name: "rotor window 1" }).click();
    await page.getByRole("textbox", { name: "rotor window 1" }).fill("z");

    await page.getByRole("textbox", { name: "rotor window 2" }).click();
    await page.getByRole("textbox", { name: "rotor window 2" }).fill("v");
  });

  const expectLongOutput = async (page: Page) => {
    await page.getByRole("switch", { name: "Group text" }).nth(1).check();
    await expect(page.getByLabel("Output")).toContainText(
      "STEUE REJTA NAFJO RDJAN STAND ORTQU AAACC CVIER NEUNN EUNZW OFAHR TZWON ULSMX XSCHA RNHOR STHCO",
    );
    const rotorWindows = page.getByRole("textbox", {
      name: /^rotor window \d/,
    });
    await expect(rotorWindows).toHaveCount(3);
    await expect(rotorWindows.nth(0)).toHaveValue("V");
    await expect(rotorWindows.nth(1)).toHaveValue("G");
    await expect(rotorWindows.nth(2)).toHaveValue("X");
  };

  test("raw mode", async ({ page }) => {
    await page.getByRole("textbox", { name: "Raw Input" }).click();
    await page
      .getByRole("textbox", { name: "Raw Input" })
      .pressSequentially(
        "ykaenzapmschzbfocuvmrmdpycofhadzizmefxthflolpzlfggbotgoxgretdwtjiqhlmxvjwkzuastr",
      );

    await expectLongOutput(page);
  });

  test("buffered with lamp panel open", async ({ page }) => {
    await page.getByRole("button", { name: "mobile" }).click();
    await page.getByRole("textbox", { name: "Buffered Input" }).click();
    await page
      .getByRole("textbox", { name: "Buffered Input" })
      .fill("ykaenzapms");
    await page.getByRole("button", { name: "Process Text" }).click();

    const rotorWindows = page.getByRole("textbox", {
      name: /^rotor window \d/,
    });
    await expect(rotorWindows).toHaveCount(3);
    await expect(rotorWindows.nth(0)).toHaveValue("V", { timeout: 30000 });
    await expect(rotorWindows.nth(1)).toHaveValue("B", { timeout: 15000 });
    await expect(rotorWindows.nth(2)).toHaveValue("F", { timeout: 10000 });

    await page.getByRole("switch", { name: "Group text" }).nth(1).check();
    await expect(page.getByLabel("Output")).toContainText("STEUE REJTA");
  });

  test("buffered with lamp panel closed", async ({ page }) => {
    await page.getByRole("button", { name: "mobile" }).click();
    await page.getByRole("textbox", { name: "Buffered Input" }).click();
    await page
      .getByRole("textbox", { name: "Buffered Input" })
      .fill(
        "ykaenzapmschzbfocuvmrmdpycofhadzizmefxthflolpzlfggbotgoxgretdwtjiqhlmxvjwkzuastr",
      );
    await page.getByText("Lamp Panel").click();

    await page.getByRole("button", { name: "Process Text" }).click();

    await expectLongOutput(page);
  });
});
