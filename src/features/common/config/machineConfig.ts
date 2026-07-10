import type { EnigmaConfig } from "../../enigma/config/enigmaConfig.ts";
import type { M209Config } from "../../m209/config/m209Config.ts";
import type { PurpleConfig } from "../../purple/config/purpleConfig.ts";

export type MachineConfig = EnigmaConfig | M209Config | PurpleConfig;
