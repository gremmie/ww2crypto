import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { EnigmaOperateTab } from "../../../src/features/enigma/EnigmaOperateTab.tsx";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("Enigma Operate Tab", () => {
  test("Renders an empty view if machine not setup", async () => {
    const { user, store } = renderWithProviders(<EnigmaOperateTab />);

    expect(screen.getByText("Setup not complete")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_content, element) =>
          element?.textContent === "Please finish setting up the machine.",
      ),
    );

    const setupButton = screen.getByRole("button", { name: "setting up" });
    await user.click(setupButton);
    expect(store.getState().enigma.currentTab).toEqual("setup");
  });
});
