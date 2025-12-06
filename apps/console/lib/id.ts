// lib/id.ts
export function createId(prefix = "sec"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
