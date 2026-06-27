import type { EnigmaMachine } from "../features/enigma/machine/enigmaMachine.ts";
import type { M209 } from "../features/m209/machine/m209.ts";

export interface StoreDependencies {
  EnigmaMachine: typeof EnigmaMachine;
  M209: typeof M209;
}
