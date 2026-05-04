export interface M209Config {
  type: "m209";
  id: string;
  name: string;
  createdAt: string; // ISO 8601 format
  drumState: [number, number][];
  wheelState: string[];
}
