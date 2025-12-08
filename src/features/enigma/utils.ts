const aCode = "A".charCodeAt(0);

export function toNumericPlug(c: string) {
  return c.charCodeAt(0) - aCode + 1;
}

export function toNumericConnection(c: string) {
  return `${toNumericPlug(c[0])}-${toNumericPlug(c[1])}`;
}
