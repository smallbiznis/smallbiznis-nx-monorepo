// You should refine these fields using your proto messages.

export interface Customer {
  id: string;
  name: string;
  email?: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  price_id: string;
  status: string;
  current_period_start?: string;
  current_period_end?: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  total_amount: number;
  currency: string;
  status: string;
  issued_at: string;
  line_items?: any[];
}

export interface Meter {
  code: string;
  name: string;
  unit: string;
  type: string;
}

export interface UsageRecord {
  meter_code: string;
  value: number;
  timestamp: string;
}

export interface BillingEvent {
  id: string;
  type: string;
  payload: any;
  created_at: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  active: boolean;
}
