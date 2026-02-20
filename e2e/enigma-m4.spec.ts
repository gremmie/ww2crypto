import { expect, test } from "@playwright/test";

test("Enigma M4 test", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "menu" }).click();
  await page.getByRole("link", { name: "Enigma" }).click();
  await page.getByRole("tab", { name: "Setup" }).click();

  await page.getByRole("radio", { name: "Four Rotor (Navy M4)" }).check();

  await page.getByRole("link", { name: "Reflector & Rotors" }).click();
  await page.getByRole("combobox", { name: "Reflector" }).click();
  await page.getByRole("option", { name: "B-Thin" }).click();
  await page.getByRole("combobox", { name: "Rotor 1" }).click();
  await page.getByRole("option", { name: "Beta" }).click();
  await page.getByRole("combobox", { name: "Rotor 2" }).click();
  await page.getByRole("option", { name: "II", exact: true }).click();
  await page.getByRole("combobox", { name: "Rotor 3" }).click();
  await page.getByRole("option", { name: "IV" }).click();
  await page.getByRole("combobox", { name: "Rotor 4" }).click();
  await page.getByRole("option", { name: "I", exact: true }).click();

  await page.getByRole("link", { name: "Ring Settings" }).click();
  await page.getByRole("combobox", { name: "Rotor 1" }).click();
  await page.getByRole("option", { name: "A" }).click();
  await page.getByRole("combobox", { name: "Rotor 2" }).click();
  await page.getByRole("option", { name: "A" }).click();
  await page.getByRole("combobox", { name: "Rotor 3" }).click();
  await page.getByRole("option", { name: "N" }).click();
  await page.getByRole("combobox", { name: "Rotor 4" }).click();
  await page.getByRole("option", { name: "V" }).click();

  await page.getByRole("link", { name: "Plugboard" }).click();
  await page.getByRole("radio", { name: "Letters" }).click();
  await page
    .getByRole("textbox", { name: "Connection String" })
    .fill("AT CL DH EP FG IO JN KQ MU RX");
  await page.getByRole("button", { name: "Set", exact: true }).click();

  await page.getByRole("link", { name: "Operate", exact: true }).click();
  await page.getByRole("textbox", { name: "rotor window 0" }).click();
  await page.getByRole("textbox", { name: "rotor window 0" }).fill("m");
  await page.getByRole("textbox", { name: "rotor window 0" }).press("Tab");
  await page.getByRole("button", { name: "Forward" }).first().press("Tab");
  await page.getByRole("button", { name: "Back" }).nth(1).press("Tab");
  await page.getByRole("textbox", { name: "rotor window 1" }).press("Tab");
  await page.getByRole("button", { name: "Forward" }).nth(1).click();
  await page.getByRole("button", { name: "Forward" }).nth(1).click();
  await page.getByRole("textbox", { name: "rotor window 2" }).click();
  await page.getByRole("textbox", { name: "rotor window 2" }).fill("s");
  await page.getByRole("textbox", { name: "rotor window 2" }).press("Tab");
  await page.getByRole("button", { name: "Forward" }).nth(2).press("Tab");
  await page.getByRole("button", { name: "Back" }).nth(3).press("Tab");
  await page.getByRole("textbox", { name: "rotor window 3" }).press("Tab");
  await page.getByRole("button", { name: "Forward" }).nth(3).click();
  await page.getByRole("button", { name: "Forward" }).nth(3).click();
  await page.getByRole("button", { name: "Forward" }).nth(3).click();
  await page.getByRole("button", { name: "Forward" }).nth(3).click();
  await page.getByRole("button", { name: "Forward" }).nth(3).click();

  const ciphertext =
    "tmkfnwzxffiiyxutihwmdhxifzeqvkdvmqswbqndyozftiwmjhxhyrpaczugrremvpanwxgtkthn" +
    "rlvhkzpgmnmvsecvckhoinplhhpvpxkmbhokccpdpevxvvhozzqbiyieouseznhjkwhydagtxdjd" +
    "jkjpkcsdsuztqcxjdvlpamgqkkshphvksvpcbuwzfizpfuup";

  await page.getByRole("textbox", { name: "Input" }).click();
  await page
    .getByRole("textbox", { name: "Input" })
    .pressSequentially(ciphertext);

  const plaintext =
    "VVVJS CHREE DERJA UFGEL EITKU RSFUE NFFUE NFGRA DNICH TSGEF UNDEN YMARS CAIER " +
    "EBEFO HLENE SQUAD RATXS TANRO RTMAR QUANT ONJOT ADREI NEUNN EUNFU ENFXS SSOOO " +
    "VIERY SEEDR EMYEI NSNUL YYEIN SNULB EDECK TYZWO ACHTM BSTEI GTYNB BELSI CHTEI NSSMT";

  await page.getByRole("switch", { name: "Group text" }).nth(1).click();
  await expect(page.getByLabel("Output")).toContainText(plaintext);
});
