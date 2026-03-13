import type { MachineConfig } from "./machineConfig.ts";

const storageKeyPrefix = "ww2crypto-";

type ConfigType = "enigma" | "m209" | "purple";

export default class ConfigStorage {
  static getConfigMap(configType: ConfigType): Map<string, MachineConfig> {
    const storageKey = this.buildStorageKey(configType);
    const savedConfigsStr = localStorage.getItem(storageKey);
    if (savedConfigsStr === null) return new Map();

    const entries = JSON.parse(savedConfigsStr) as [string, MachineConfig][];
    if (configType !== "enigma") return new Map(entries);

    // Enigma configs didn't always have a type field. Fix that up.
    const fixedEntries: [string, MachineConfig][] = entries.map(
      ([key, config]) => [key, { ...config, type: "enigma" }],
    );
    return new Map(fixedEntries);
  }

  static getConfig(configType: ConfigType, configName: string) {
    return ConfigStorage.getConfigMap(configType).get(configName);
  }

  static getConfigs(configType: ConfigType) {
    return Array.from(ConfigStorage.getConfigMap(configType).values());
  }

  static saveConfig(configType: ConfigType, config: MachineConfig) {
    const configMap = ConfigStorage.getConfigMap(configType);
    configMap.set(config.name, config);
    ConfigStorage.saveConfigMap(configType, configMap);
  }

  static removeConfig(configType: ConfigType, configName: string) {
    const configMap = ConfigStorage.getConfigMap(configType);
    configMap.delete(configName);
    ConfigStorage.saveConfigMap(configType, configMap);
  }

  static saveConfigMap(
    configType: ConfigType,
    configMap: Map<string, MachineConfig>,
  ) {
    const storageKey = this.buildStorageKey(configType);
    localStorage.setItem(
      storageKey,
      JSON.stringify(Array.from(configMap.entries())),
    );
  }

  private static buildStorageKey(configType: ConfigType) {
    return `${storageKeyPrefix}${configType}`;
  }
}
