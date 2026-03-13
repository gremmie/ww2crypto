import type { MachineConfig } from "../common/config/machineConfig.ts";

const storageKey = "ww2crypto-configs";

export default class ConfigStorage2 {
  static saveConfigs(configs: MachineConfig[]) {
    self.localStorage.setItem(storageKey, JSON.stringify(configs));
  }

  static loadConfigs() {
    const jsonStr = self.localStorage.getItem(storageKey);
    if (jsonStr === null) return [];
    return JSON.parse(jsonStr) as MachineConfig[];
  }
}
