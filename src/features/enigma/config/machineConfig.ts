export interface MachineConfig {
  name: string;
  createdAt: Date;
  reflector: string;
  rotors: string[];
  rings: number[];
  ringNotation: "letter" | "number";
  plugboard: string;
  plugboardNotation: "letter" | "number";
}
