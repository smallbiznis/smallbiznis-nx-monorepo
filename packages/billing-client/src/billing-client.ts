// packages/sdk/billing-client.ts
import type {
  Customer,
  Subscription,
  Invoice,
  Meter,
  UsageRecord,
  BillingEvent,
  WebhookEndpoint,
} from "./types";

// ==================================
// Billing Client Config
// ==================================
export type BillingClientConfig = {
  baseUrl: string;                  // e.g. "https://api.smallbiznis.com"
  tenantId: string;                 // current tenant context
  environment: "test" | "live";     // environment mode
  sessionToken: string;             // user session token
};

// ==================================
// SDK Error Wrapper
// ==================================
export class BillingApiError extends Error {
  status: number;
  details: any;

  constructor({ status, message, details }: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// ==================================
// BillingClient Main Class
// ==================================
export class BillingClient {
  private baseUrl: string;
  private tenantId: string;
  private environment: "test" | "live";
  private sessionToken: string;

  constructor(config: BillingClientConfig) {
    this.baseUrl = config.baseUrl;
    this.tenantId = config.tenantId;
    this.environment = config.environment;
    this.sessionToken = config.sessionToken;
  }

  // ==================================
  // Base Request Helper
  // ==================================
  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.sessionToken}`,
      "X-SB-Tenant-ID": this.tenantId,
      "X-SB-Environment": this.environment,
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new BillingApiError({
        status: response.status,
        message: err.message || "Billing API Error",
        details: err,
      });
    }

    return response.json() as Promise<T>;
  }

  // ==================================
  // CUSTOMERS
  // ==================================
  customers = {
    list: () =>
      this.request<Customer[]>(`/v1/customers`),

    get: (id: string) =>
      this.request<Customer>(`/v1/customers/${id}`),

    create: (body: Partial<Customer>) =>
      this.request<Customer>(`/v1/customers`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
  };

  // ==================================
  // SUBSCRIPTIONS
  // ==================================
  subscriptions = {
    list: () =>
      this.request<Subscription[]>(`/v1/subscriptions`),

    get: (id: string) =>
      this.request<Subscription>(`/v1/subscriptions/${id}`),

    create: (body: Partial<Subscription>) =>
      this.request<Subscription>(`/v1/subscriptions`, {
        method: "POST",
        body: JSON.stringify(body),
      }),

    cancel: (id: string) =>
      this.request<Subscription>(`/v1/subscriptions/${id}/cancel`, {
        method: "POST",
      }),
  };

  // ==================================
  // INVOICES
  // ==================================
  invoices = {
    list: () =>
      this.request<Invoice[]>(`/v1/invoices`),

    get: (id: string) =>
      this.request<Invoice>(`/v1/invoices/${id}`),
  };

  // ==================================
  // METERS (READ ONLY)
  // ==================================
  meters = {
    list: () =>
      this.request<Meter[]>(`/v1/meters`),
  };

  // ==================================
  // USAGE (READ ONLY)
  // ==================================
  usage = {
    list: () =>
      this.request<UsageRecord[]>(`/v1/usage`),
  };

  // ==================================
  // BILLING EVENTS (READ ONLY)
  // ==================================
  events = {
    list: () =>
      this.request<BillingEvent[]>(`/v1/events`),

    get: (id: string) =>
      this.request<BillingEvent>(`/v1/events/${id}`),
  };

  // ==================================
  // WEBHOOK ENDPOINTS
  // ==================================
  webhooks = {
    list: () =>
      this.request<WebhookEndpoint[]>(`/v1/webhooks`),

    create: (body: Partial<WebhookEndpoint>) =>
      this.request<WebhookEndpoint>(`/v1/webhooks`, {
        method: "POST",
        body: JSON.stringify(body),
      }),

    delete: (id: string) =>
      this.request<{ success: boolean }>(`/v1/webhooks/${id}`, {
        method: "DELETE",
      }),
  };
}
