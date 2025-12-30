import Rotor from "./Rotor.ts";
import { reflectorDataByType } from "./rotorData.ts";

export default function reflectorFactory(type: string) {
  const wiring = reflectorDataByType.get(type);
  if (wiring === undefined) return null;

  return new Rotor(type, wiring, 0, []);
}
