import { screen } from "@testing-library/react";
import { beforeAll, describe, expect, type Mock, test, vi } from "vitest";
import {
  type RootState,
  setupStore,
} from "../../../../../src/app/setupStore.ts";
import type { StoreDependencies } from "../../../../../src/app/storeDependencies.ts";
import { OperateView } from "../../../../../src/features/m209/components/operate/operateView.tsx";
import { renderWithProviders } from "../../../../utils/test-utils.tsx";

describe("operateView", () => {
  let mockM209: never;
  let mockRotateMainAxle: Mock;

  beforeAll(() => {
    mockRotateMainAxle = vi.fn();
    mockM209 = {
      factory: vi.fn().mockReturnValue({
        rotateMainAxle: mockRotateMainAxle,
        resetLetterCounter: vi.fn(),
        convert: vi.fn().mockReturnValue(""),
        wheelPositions: vi.fn().mockReturnValue([0, 0, 0, 0, 0, 0]),
        letterCount: 0,
      }),
    } as never;
  });

  const setupTestStore = (preloadedState?: Partial<RootState>) => {
    const deps: StoreDependencies = {
      M209: mockM209,
    };
    return setupStore(deps, preloadedState);
  };

  test("can rotate main axle forward", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const forwards = screen.getAllByRole("button", { name: "Forward" });
    expect(forwards).toHaveLength(7);
    const axleForward = forwards[6]!;
    await user.click(axleForward);

    expect(mockRotateMainAxle).toHaveBeenCalledWith(1);
  });

  test("can rotate main axle backward", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const backwards = screen.getAllByRole("button", { name: "Back" });
    expect(backwards).toHaveLength(7);
    const axleBackward = backwards[6]!;
    await user.click(axleBackward);

    expect(mockRotateMainAxle).toHaveBeenCalledWith(-1);
  });
});
