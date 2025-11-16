
import {
  BRANDING_CONTEXT_HEADER,
  TENANT_CONTEXT_HEADER
} from './constants';

function normalizeForJson(value: unknown): unknown {
  if (value == null) return value;
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeForJson(entry));
  }
  if (typeof value === "object") {
    const normalized: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      normalized[key] = normalizeForJson(entry);
    }
    return normalized;
  }
  return value;
}

export function encodePayload(payload: unknown) {
  return encodeURIComponent(JSON.stringify(payload ?? null));
}

export function decodePayload(value: string | null) {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

export function buildTenantHeaderValue(payload: unknown) {
  return encodePayload(normalizeForJson(payload));
}

export function readTenantFromHeaders(headers: Headers) {
  return decodePayload(headers.get(TENANT_CONTEXT_HEADER));
}

export function readTenantFromRequest(req: Request) {
  return readTenantFromHeaders(req.headers);
}

export function attachTenantHeader(headers: Headers, payload: unknown) {
  headers.set(TENANT_CONTEXT_HEADER, buildTenantHeaderValue(payload));
}

export function buildTenantBradingHeaderValue(payload: unknown) {
  return encodePayload(normalizeForJson(payload));
}

export function readTenantBrandingFromHeaders(headers: Headers) {
  return decodePayload(headers.get(BRANDING_CONTEXT_HEADER));
}

export function attahTenantBranding(headers: Headers, payload: unknown) {
  headers.set(BRANDING_CONTEXT_HEADER, buildTenantHeaderValue(payload));
}

export function normalizePayload<T>(payload: T) {
  return normalizeForJson(payload);
}

export function extractTenantIdValue(tenant: any) {
  if (!tenant) return null;
  const candidate = tenant.id ?? tenant.tenantId ?? tenant.tenant_id;
  if (typeof candidate === "bigint") return candidate.toString();
  if (typeof candidate === "number") {
    if (!Number.isFinite(candidate)) return null;
    return Math.trunc(candidate).toString();
  }
  if (typeof candidate === "string" && candidate) return candidate;
  return null;
}

export { TENANT_CONTEXT_HEADER };
