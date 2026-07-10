import type { EnigmaMachine } from "../features/enigma/machine/enigmaMachine.ts";
import type { M209 } from "../features/m209/machine/m209.ts";
import type { Purple } from "../features/purple/machine/purple.ts";

export interface StoreDependencies {
  EnigmaMachine: typeof EnigmaMachine;
  M209: typeof M209;
  Purple: typeof Purple;
}
