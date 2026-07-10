import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ConfigSummary } from "../../../../src/features/config/components/configSummary.tsx";
import type { EnigmaConfig } from "../../../../src/features/enigma/config/enigmaConfig.ts";
import { setupSummary } from "../../../../src/features/enigma/utils.ts";
import type { M209Config } from "../../../../src/features/m209/config/m209Config.ts";
import { drumLugStateToStr } from "../../../../src/features/m209/utils.ts";
import type { PurpleConfig } from "../../../../src/features/purple/config/purpleConfig.ts";
import { renderWithProviders } from "../../../utils/test-utils.tsx";

const enigmaConfig: EnigmaConfig = {
  type: "enigma",
  id: "e1",
  name: "Enigma A",
  createdAt: "2026-07-10T00:00:00.000Z",
  reflector: "B",
  rotors: ["I", "II", "III"],
  rings: [1, 1, 1],
  ringNotation: "number",
  plugboard: "AB CD",
  plugboardNotation: "letter",
};

const purpleConfig: PurpleConfig = {
  type: "purple",
  id: "p1",
  name: "Purple A",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "2-1-3",
};

const m209Config: M209Config = {
  type: "m209",
  id: "m1",
  name: "M209 A",
  createdAt: "2026-07-10T00:00:00.000Z",
  drumState: [
    [1, 2],
    [3, 4],
  ],
  wheelState: ["ABC", "DEF"],
};

describe("ConfigSummary", () => {
  test("renders the enigma setup summary string", () => {
    renderWithProviders(<ConfigSummary config={enigmaConfig} />);
    expect(screen.getByText(setupSummary(enigmaConfig))).toBeInTheDocument();
  });

  test("renders the purple plugboard and switch order", () => {
    renderWithProviders(<ConfigSummary config={purpleConfig} />);
    expect(
      screen.getByText(
        `${purpleConfig.plugboard} : ${purpleConfig.switchOrder}`,
      ),
    ).toBeInTheDocument();
  });

  test("renders the m209 lugs and wheel settings in a table", async () => {
    const { user } = renderWithProviders(<ConfigSummary config={m209Config} />);

    // Expand the accordion to reveal the settings table.
    await user.click(screen.getByText("Settings"));

    expect(screen.getByText("Lugs:")).toBeInTheDocument();
    expect(
      screen.getByText(drumLugStateToStr(m209Config.drumState)),
    ).toBeInTheDocument();
    expect(screen.getByText("Wheel 1:")).toBeInTheDocument();
    expect(screen.getByText("Wheel 2:")).toBeInTheDocument();
    expect(screen.getByText("ABC")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
  });
});
