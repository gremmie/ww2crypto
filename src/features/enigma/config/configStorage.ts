import type { MachineConfig } from "./machineConfig.ts";

const enigmaKey = "ww2crypto-enigma";

export default class ConfigStorage {
  static getConfigMap(): Map<string, MachineConfig> {
    const savedConfigsStr = localStorage.getItem(enigmaKey);
    return savedConfigsStr === null
      ? new Map()
      : new Map(JSON.parse(savedConfigsStr));
  }

  static getConfig(configName: string) {
    return ConfigStorage.getConfigMap().get(configName);
  }

  static getConfigs() {
    return Array.from(ConfigStorage.getConfigMap().values());
  }

  static saveConfig(config: MachineConfig) {
    const configMap = ConfigStorage.getConfigMap();
    configMap.set(config.name, config);
    ConfigStorage.saveConfigMap(configMap);
  }

  static saveConfigMap(configMap: Map<string, MachineConfig>) {
    localStorage.setItem(
      enigmaKey,
      JSON.stringify(Array.from(configMap.entries())),
    );
  }
}
