import { expect, test as base, type Page } from "@playwright/test";

// WebKit has no launch-flag equivalent of Chromium's --mute-audio or Firefox's
// media.volume_scale. Stub window.Audio before any page script runs so that
// audioMiddleware's module-level `new Audio(...)` captures a silent instance.
async function silenceAudio(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.Audio = class {
      currentTime = 0;
      play(): Promise<void> {
        return Promise.resolve();
      }
      pause(): void {}
      addEventListener(): void {}
      removeEventListener(): void {}
    } as unknown as typeof Audio;
  });
}

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await silenceAudio(page);
    await use(page);
  },
});

export { expect };
export type { Page };
