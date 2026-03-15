import type { MachineConfig } from "../common/config/machineConfig.ts";

const storageKey = "ww2crypto-configs";

export default class ConfigStorage {
  static saveConfigs(configs: MachineConfig[]) {
    self.localStorage.setItem(storageKey, JSON.stringify(configs));
  }

  static loadConfigs() {
    const jsonStr = self.localStorage.getItem(storageKey);
    if (jsonStr === null) return [];
    return JSON.parse(jsonStr) as MachineConfig[];
  }

  static removeConfig(id: string) {
    const configs = ConfigStorage.loadConfigs();
    const newConfigs = configs.filter((config) => config.id !== id);
    ConfigStorage.saveConfigs(newConfigs);
  }

  static saveConfig(config: MachineConfig) {
    const configs = ConfigStorage.loadConfigs();
    configs.push(config);
    ConfigStorage.saveConfigs(configs);
  }
}
