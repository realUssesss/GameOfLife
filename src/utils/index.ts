export function jsonCopy<T extends Object>(a: T): T {
  return JSON.parse(JSON.stringify(a));
}
