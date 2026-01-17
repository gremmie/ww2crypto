export interface MachineConfig {
  name: string;
  createdAt: string; // ISO 8601 format
  reflector: string;
  rotors: string[];
  rings: number[];
  ringNotation: "letter" | "number";
  plugboard: string;
  plugboardNotation: "letter" | "number";
}
