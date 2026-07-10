import { screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, test, vi } from "vitest";

import SetupCard from "../../../../src/features/config/components/setupCard.tsx";
import type { PurpleConfig } from "../../../../src/features/purple/config/purpleConfig.ts";
import { renderWithProviders } from "../../../utils/test-utils.tsx";

const config: PurpleConfig = {
  type: "purple",
  id: "p1",
  name: "Purple A",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "1-2-3",
};

function renderCard(overrides: Partial<ComponentProps<typeof SetupCard>> = {}) {
  const props = {
    config,
    isSelected: false,
    clickCallback: vi.fn(),
    dblClickCallback: vi.fn(),
    deleteCallback: vi.fn(),
    ...overrides,
  };
  return { props, ...renderWithProviders(<SetupCard {...props} />) };
}

describe("SetupCard", () => {
  test("renders the config name and its summary", () => {
    renderCard();
    expect(screen.getByText("Purple A")).toBeInTheDocument();
    expect(
      screen.getByText(`${config.plugboard} : ${config.switchOrder}`),
    ).toBeInTheDocument();
  });

  test("invokes clickCallback with the config on click", async () => {
    const { props, user } = renderCard();
    await user.click(screen.getByText("Purple A"));
    expect(props.clickCallback).toHaveBeenCalledWith(config);
  });

  test("invokes dblClickCallback with the config on double click", async () => {
    const { props, user } = renderCard();
    await user.dblClick(screen.getByText("Purple A"));
    expect(props.dblClickCallback).toHaveBeenCalledWith(config);
  });

  test("invokes deleteCallback with the config when the delete button is clicked", async () => {
    const { props, user } = renderCard();
    await user.click(screen.getByRole("button", { name: "delete" }));
    expect(props.deleteCallback).toHaveBeenCalledWith(config);
  });
});
