import Rotor from "./rotor.ts";
import { rotorDataByType } from "./rotorData.ts";

export default function rotorFactory(
  type: string,
  ringSetting?: number | string,
) {
  const rotorData = rotorDataByType.get(type);
  if (rotorData === undefined) return null;

  return new Rotor(type, rotorData.wiring, ringSetting, rotorData.stepping);
}
