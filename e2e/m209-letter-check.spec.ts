import { expect, test } from "./fixtures.ts";

test("M-209 letter check", async ({ page }) => {
  const expectKeyWheel = async (n: number, letter: string): Promise<void> => {
    await expect(
      page.getByRole("textbox", { name: `Key wheel ${n}` }),
    ).toHaveValue(letter);
  };
  const expectFinalState = async () => {
    await expect(page.getByRole("textbox", { name: "counter" })).toHaveValue(
      "0026",
    );
    await expectKeyWheel(0, "A");
    await expectKeyWheel(1, "B");
    await expectKeyWheel(2, "D");
    await expectKeyWheel(3, "F");
    await expectKeyWheel(4, "H");
    await expectKeyWheel(5, "J");
  };

  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "menu" }).click();
  await page.getByRole("link", { name: "M-209", exact: true }).click();
  await page.getByRole("tab", { name: "Setup" }).click();

  await page
    .getByRole("textbox", { name: "Bulk Set Lugs" })
    .fill("0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6");
  await page.getByRole("button", { name: "Bulk Set Lugs" }).click();

  await page.getByRole("tab", { name: "Wheel Pins" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page
    .getByRole("textbox", { name: "Bulk Set Pins" })
    .fill("ABCEFGHIJMNPQRTWX");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("button", { name: "wheel 2" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page
    .getByRole("textbox", { name: "Bulk Set Pins" })
    .fill("ABDGHKMSUXZ");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("button", { name: "wheel 3" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page
    .getByRole("textbox", { name: "Bulk Set Pins" })
    .fill("ABCEKLMNORSX");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("button", { name: "wheel 4" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).fill("BIJLOQU");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("button", { name: "wheel 5" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).fill("BCDEJMQS");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("button", { name: "wheel 6" }).click();
  await page.getByRole("textbox", { name: "Bulk Set Pins" }).click();
  await page
    .getByRole("textbox", { name: "Bulk Set Pins" })
    .fill("ACFGIJKMNOQ");
  await page.getByRole("button", { name: "Bulk Set Pins" }).click();

  await page.getByRole("tab", { name: "Operate" }).click();
  await expect(page.getByRole("textbox", { name: "counter" })).toHaveValue(
    "0000",
  );
  for (let i = 0; i < 6; ++i) {
    await expectKeyWheel(i, "A");
  }

  await page.getByRole("textbox", { name: "Input" }).click();
  await page
    .getByRole("textbox", { name: "Input" })
    .fill("AAAAAAAAAAAAAAAAAAAAAAAAAA");

  await page.getByRole("button", { name: "select convert style" }).click();
  await page.getByRole("menuitem", { name: "Fast Convert" }).click();
  await page.getByRole("button", { name: "Fast Convert" }).click();

  await page.getByRole("textbox", { name: "Output" }).click();
  await expect(page.getByLabel("Output")).toContainText(
    "QXIAS TCPIU WZAFN FFSIF AOLSY D",
  );
  await expectFinalState();

  await page.getByRole("button", { name: "reset" }).click();
  await expect(page.getByRole("textbox", { name: "counter" })).toHaveValue(
    "0000",
  );
  for (let i = 0; i < 6; ++i) {
    await expectKeyWheel(i, "A");
  }

  await page.getByRole("switch", { name: "Cipher/Decipher" }).check();
  await page.getByRole("button", { name: "Clear" }).first().click();
  await expect(page.getByRole("textbox", { name: "Input" })).toHaveValue("");
  await page
    .getByRole("textbox", { name: "Input" })
    .fill("QXIAS TCPIU WZAFN FFSIF AOLSY D");

  await page.getByRole("button", { name: "Clear" }).nth(1).click();
  await expect(page.getByRole("textbox", { name: "Output" })).toHaveValue("");
  await page.getByRole("button", { name: "Format" }).click();
  await expect(page.getByRole("textbox", { name: "Input" })).toHaveValue(
    "QXIASTCPIUWZAFNFFSIFAOLSYD",
  );
  await page.getByRole("button", { name: "Fast Convert" }).click();
  await expect(page.getByLabel("Output")).toContainText(
    "AAAAAAAAAAAAAAAAAAAAAAAAAA",
  );
  await expectFinalState();
});
