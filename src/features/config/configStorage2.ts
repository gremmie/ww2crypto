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

  static removeConfig(id: string) {
    const configs = ConfigStorage2.loadConfigs();
    const newConfigs = configs.filter((config) => config.id !== id);
    ConfigStorage2.saveConfigs(newConfigs);
  }

  static saveConfig(config: MachineConfig) {
    const configs = ConfigStorage2.loadConfigs();
    configs.push(config);
    ConfigStorage2.saveConfigs(configs);
  }
}
