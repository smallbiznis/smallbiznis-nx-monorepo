'use client';

import { useEffect, useMemo, useState } from 'react';

const navSections = [
  {
    title: 'Billing Home',
    children: [],
  },
  {
    title: 'Products & Pricing',
    children: ['Products', 'Plans', 'Pricing Models', 'Usage Metrics', 'Metering Rules'],
  },
  {
    title: 'Customers',
    children: ['Customer List', 'Customer Details', 'Payment Methods'],
  },
  {
    title: 'Subscriptions',
    children: ['Active Subscriptions', 'Create Subscription', 'Schedule Changes'],
  },
  {
    title: 'Usage & Metering',
    children: ['Metric Definitions', 'Usage Records', 'Quotas & Limits'],
  },
  {
    title: 'Invoices',
    children: ['Draft', 'Finalized', 'Paid / Unpaid', 'Credit Notes'],
  },
  {
    title: 'Reports',
    children: ['Revenue', 'Usage Trends', 'Churn'],
  },
  {
    title: 'Settings',
    children: ['Billing Configuration', 'Subscription Defaults', 'Webhooks', 'API Keys'],
  },
];

const productRows = [
  { name: 'Compute Mesh', code: 'compute-mesh', status: 'Active', plans: 3, created: 'Jan 18, 2024' },
  { name: 'Messaging Fabric', code: 'msg-fabric', status: 'Active', plans: 5, created: 'Feb 02, 2024' },
  { name: 'Storage Vault', code: 'storage-vault', status: 'Inactive', plans: 2, created: 'Mar 05, 2024' },
  { name: 'Insights API', code: 'insights-api', status: 'Active', plans: 4, created: 'Apr 12, 2024' },
];

const planRows = [
  {
    plan: 'Enterprise Plus',
    product: 'Compute Mesh',
    model: 'Package',
    price: '$1,200 / mo',
    status: 'Active',
    metrics: 'CPU Hours',
  },
  {
    plan: 'Developer Starter',
    product: 'Messaging Fabric',
    model: 'Usage-based',
    price: '$0.10 / msg',
    status: 'Active',
    metrics: 'Messages',
  },
  {
    plan: 'Storage Atlas',
    product: 'Storage Vault',
    model: 'Tiered',
    price: '$0.05 - $0.02 / GB',
    status: 'Inactive',
    metrics: 'Storage GB',
  },
];

const metricDefinitions = [
  {
    name: 'API Calls',
    code: 'api_calls',
    type: 'Counter',
    unit: 'call',
    description: 'Tracks authenticated API requests per tenant',
    lastUsed: '3m ago',
    status: 'Active',
  },
  {
    name: 'Storage I/O',
    code: 'storage_io',
    type: 'Gauge',
    unit: 'IOPS',
    description: 'High-resolution storage throughput',
    lastUsed: '12h ago',
    status: 'Active',
  },
  {
    name: 'Active Users',
    code: 'active_users',
    type: 'Gauge',
    unit: 'user',
    description: 'Number of MAUs for the subscription',
    lastUsed: '1d ago',
    status: 'Retired',
  },
];

const subscriptionRows = [
  {
    customer: 'Nova Biosystems',
    plan: 'Enterprise Plus',
    status: 'Active',
    start: 'Jan 01, 2024',
    currentPeriodEnd: 'Jan 31, 2025',
    nextInvoice: '$4,200',
    usage: '62%',
  },
  {
    customer: 'SevenCloud',
    plan: 'Developer Starter',
    status: 'Trialing',
    start: 'May 08, 2024',
    currentPeriodEnd: 'Jun 07, 2024',
    nextInvoice: '$120',
    usage: '18%',
  },
  {
    customer: 'Reflect Labs',
    plan: 'Storage Atlas',
    status: 'Paused',
    start: 'Mar 22, 2024',
    currentPeriodEnd: 'Mar 22, 2025',
    nextInvoice: '$0',
    usage: '0%',
  },
];

const invoiceRows = [
  {
    id: '#INV-12019',
    customer: 'Nova Biosystems',
    status: 'Paid',
    amount: '$4,200',
    period: 'May 2024',
    issued: 'May 01, 2024',
    due: 'May 15, 2024',
  },
  {
    id: '#INV-12108',
    customer: 'SevenCloud',
    status: 'Draft',
    amount: '$120',
    period: 'Jun 2024',
    issued: 'May 28, 2024',
    due: 'Jun 12, 2024',
  },
  {
    id: '#INV-11843',
    customer: 'Reflect Labs',
    status: 'Unpaid',
    amount: '$980',
    period: 'Apr 2024',
    issued: 'Apr 15, 2024',
    due: 'Apr 30, 2024',
  },
];

const reportSeries = [
  { label: 'Revenue', color: '#38bdf8', points: [0, 40, 55, 70, 110, 130, 165] },
  { label: 'Usage', color: '#fb923c', points: [0, 30, 45, 60, 90, 105, 130] },
];

export default function ConsolePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const computedMetricPreview = useMemo(() => {
    const total = reportSeries.reduce((sum, series) => sum + series.points.at(-1)!, 0);
    return `${Math.round(total / reportSeries.length)}k projected`; 
  }, []);

  return (
    <div className="console-shell">
      <aside className="console-sidebar">
        <div className="sidebar-brand">Billing-as-a-Service</div>
        <nav>
          {navSections.map((section) => (
            <div className="sidebar-section" key={section.title}>
              <p>{section.title}</p>
              {section.children.length > 0 && (
                <ul>
                  {section.children.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>Tenant Branding</span>
          <select>
            <option>Neutral Palette</option>
            <option>Alliance Blue</option>
            <option>Insight Slate</option>
          </select>
        </div>
      </aside>

      <div className="console-main">
        <header className="console-top-bar">
          <div className="top-bar-left">
            <div className="tenant-pill">
              <span>SmallBiznis HQ</span>
              <span className="tenant-sub">/ billing</span>
            </div>
            <div className="search-wrapper">
              <input placeholder="Search products, customers, invoices" />
              <span className="search-hint">⌘K</span>
            </div>
          </div>
          <div className="top-bar-right">
            <button className="top-control" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>
            <button className="top-control">Share</button>
            <div className="avatar">ST</div>
          </div>
        </header>

        <main className="console-content">
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Billing-as-a-Service Console</p>
              <h1>Enterprise billing orchestrated by SmallBiznis</h1>
              <p className="hero-copy">
                Sync products, plans, meters, subscriptions, and invoices from a single, high-density command center.
                Each tenant can customize pricing, branding, and API access for their customers.
              </p>
            </div>
            <div className="hero-actions">
              <button onClick={() => setActiveModal('create-product')}>Create Product</button>
              <button className="ghost" onClick={() => setActiveModal('create-plan')}>
                Launch Plan Builder
              </button>
            </div>
          </section>

          <section className="stats-grid">
            {[
              { label: 'Active subscriptions', value: '1,280', trend: '+12% vs last month' },
              { label: 'Projected MRR', value: '$483k', trend: 'Forecast steady' },
              { label: 'Metered usage', value: '72 metrics', trend: '48 active definitions' },
              { label: 'Invoices issued', value: '312', trend: '14 unpaid' },
            ].map((item) => (
              <article key={item.label} className="card compact">
                <p className="eyebrow">{item.label}</p>
                <h3>{item.value}</h3>
                <p className="muted">{item.trend}</p>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <article className="card table-card">
              <header>
                <h2>Products &amp; plans</h2>
                <div>
                  <button onClick={() => setActiveModal('create-plan')} className="ghost">
                    Create plan model
                  </button>
                  <button onClick={() => setActiveModal('create-product')}>New product</button>
                </div>
              </header>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Code</th>
                      <th>Status</th>
                      <th>Plans</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productRows.map((row) => (
                      <tr key={row.code}>
                        <td>{row.name}</td>
                        <td>{row.code}</td>
                        <td>{row.status}</td>
                        <td>{row.plans} plans</td>
                        <td>{row.created}</td>
                        <td className="table-actions">
                          <button>View</button>
                          <button className="ghost">Edit</button>
                          <button className="danger">Archive</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="card table-card">
              <header>
                <h2>Plans &amp; pricing models</h2>
                <select>
                  <option>All status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </header>
              <div className="table-scroll dense">
                <table>
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Product</th>
                      <th>Model</th>
                      <th>Price</th>
                      <th>Metrics</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planRows.map((row) => (
                      <tr key={row.plan}>
                        <td>{row.plan}</td>
                        <td>{row.product}</td>
                        <td>{row.model}</td>
                        <td>{row.price}</td>
                        <td>{row.metrics}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>

          <section className="grid-2">
            <article className="card">
              <header>
                <h2>Usage metric definitions</h2>
                <button className="ghost" onClick={() => setActiveModal('create-metric')}>
                  Create metric definition
                </button>
              </header>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Unit</th>
                      <th>Description</th>
                      <th>Last used</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricDefinitions.map((metric) => (
                      <tr key={metric.code}>
                        <td>{metric.name}</td>
                        <td>{metric.code}</td>
                        <td>{metric.type}</td>
                        <td>{metric.unit}</td>
                        <td>{metric.description}</td>
                        <td>{metric.lastUsed}</td>
                        <td>{metric.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="empty-state">
                <span>Empty preview</span>
                <p>Metric definitions can be assigned directly to usage-based plans.</p>
              </div>
            </article>

            <article className="card">
              <header>
                <h2>Subscriptions</h2>
                <button onClick={() => setActiveModal('create-subscription')}>Create subscription</button>
              </header>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Start</th>
                      <th>Current</th>
                      <th>Next invoice</th>
                      <th>Usage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionRows.map((sub) => (
                      <tr key={sub.customer}>
                        <td>{sub.customer}</td>
                        <td>{sub.plan}</td>
                        <td>{sub.status}</td>
                        <td>{sub.start}</td>
                        <td>{sub.currentPeriodEnd}</td>
                        <td>{sub.nextInvoice}</td>
                        <td>
                          <span className="usage-bar">
                            <span style={{ width: sub.usage }} />
                          </span>
                          <small>{sub.usage} usage</small>
                        </td>
                        <td className="table-actions">
                          <button className="ghost">View</button>
                          <button className="ghost">Edit</button>
                          <button className="danger">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="loading-state">Loading billing history...</div>
            </article>
          </section>

          <section className="grid-2">
            <article className="card">
              <header>
                <h2>Invoices</h2>
                <button className="ghost">Issue invoice</button>
              </header>
              <div className="table-scroll dense">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Period</th>
                      <th>Issued</th>
                      <th>Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceRows.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.customer}</td>
                        <td>{invoice.status}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.period}</td>
                        <td>{invoice.issued}</td>
                        <td>{invoice.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="json-view">
                <strong>Invoice metadata (JSON)</strong>
                <pre>{`{
  "line_items": [...],
  "tax": 0.07,
  "status": "paid"
}`}</pre>
              </div>
            </article>

            <article className="card">
              <header>
                <h2>Reports &amp; analytics</h2>
                <span className="eyebrow">High-density telemetry</span>
              </header>
              <div className="chart-grid">
                {reportSeries.map((series) => (
                  <div key={series.label}>
                    <p>{series.label}</p>
                    <div className="sparkline">
                      {series.points.map((value, index) => (
                        <span
                          key={`${series.label}-${index}`}
                          style={{
                            height: `${value}%`,
                            background: series.color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="forecast">
                <div>
                  <strong>Forecast</strong>
                  <p>{computedMetricPreview} in 30 days</p>
                </div>
                <div>
                  <strong>Churn</strong>
                  <p>1.4% (target &lt; 2%)</p>
                </div>
                <div>
                  <strong>Active plans</strong>
                  <p>24 / 36 ready</p>
                </div>
              </div>
            </article>
          </section>

          <section className="grid-2">
            <article className="card">
              <h2>Plan creation form</h2>
              <form className="form-grid">
                <label>
                  Name
                  <input placeholder="Enterprise Plus" />
                </label>
                <label>
                  Code
                  <input placeholder="enterprise_plus" />
                </label>
                <label>
                  Description
                  <textarea placeholder="Describe the plan experience" rows={3} />
                </label>
                <label>
                  Status
                  <select>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
                <label>
                  Pricing model
                  <select>
                    <option>Flat rate</option>
                    <option>Tiered</option>
                    <option>Volume</option>
                    <option>Usage-based</option>
                    <option>Package</option>
                  </select>
                </label>
                <label>
                  Currency
                  <select>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </label>
                <label>
                  Base price
                  <input placeholder="$1,200" />
                </label>
                <label>
                  Allow overage billing
                  <select>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </label>
                <label>
                  Trial days
                  <input placeholder="14" />
                </label>
                <label>
                  Metered metric
                  <input placeholder="api_calls" />
                </label>
                <div className="form-actions">
                  <button type="submit">Save plan</button>
                  <button type="button" className="ghost">
                    Cancel
                  </button>
                </div>
              </form>
            </article>

            <article className="card">
              <h2>Usage metric creation</h2>
              <form className="form-grid">
                <label>
                  Name
                  <input placeholder="API Calls" />
                </label>
                <label>
                  Code
                  <input placeholder="api_calls" />
                </label>
                <label>
                  Description
                  <textarea placeholder="Track every authenticated API hit" rows={2} />
                </label>
                <label>
                  Type
                  <select>
                    <option>Counter</option>
                    <option>Gauge</option>
                  </select>
                </label>
                <label>
                  Unit
                  <input placeholder="request" />
                </label>
                <label>
                  Metadata
                  <textarea className="json-editor" rows={4} defaultValue={`{
  "retention": "30d",
  "aggregation": "sum"
}`} />
                </label>
                <p className="muted">Preview: {computedMetricPreview} subscription impact</p>
                <div className="form-actions">
                  <button type="submit">Publish metric</button>
                  <button type="button" className="ghost">
                    Reset
                  </button>
                </div>
              </form>
            </article>
          </section>

          <section className="settings-section">
            <article className="card">
              <header>
                <h2>Billing configuration</h2>
                <span className="eyebrow">Defaults &amp; automation</span>
              </header>
              <div className="settings-grid">
                <label>
                  Default currency
                  <select>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>JPY</option>
                  </select>
                </label>
                <label>
                  Invoice numbering
                  <input placeholder="INV-0001" />
                </label>
                <label>
                  Auto-collection
                  <select>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </label>
                <label>
                  Credit balancing
                  <select>
                    <option>Apply before invoice</option>
                    <option>Apply after invoice</option>
                  </select>
                </label>
              </div>
            </article>

            <article className="card">
              <header>
                <h2>API keys &amp; webhooks</h2>
                <span className="eyebrow">Scoped developer tools</span>
              </header>
              <div className="settings-grid">
                <div>
                  <strong>Active keys</strong>
                  <div className="key-line">
                    <span>live-01cf...</span>
                    <button className="ghost">Copy</button>
                    <button className="danger">Revoke</button>
                  </div>
                  <div className="key-line">
                    <span>sbox-7f84...</span>
                    <button className="ghost">Copy</button>
                    <button className="ghost">Rotate</button>
                  </div>
                </div>
                <div>
                  <strong>Scopes</strong>
                  <p className="muted">Read: metrics, billing. Write: invoices, subscriptions.</p>
                </div>
                <div>
                  <strong>Last used</strong>
                  <p>4m ago · CLI</p>
                </div>
                <div>
                  <strong>Webhooks</strong>
                  <p className="muted">2 endpoints · Retry 3x · Signed payloads</p>
                </div>
                <button className="ghost">Send test event</button>
                <button>View delivery logs</button>
              </div>
            </article>
          </section>
        </main>
      </div>

      <aside className="console-drawer">
        <div className="drawer-header">
          <h3>Metadata &amp; actions</h3>
          <span className="eyebrow">Right drawer</span>
        </div>
        <div className="drawer-section">
          <p className="muted">Tenant state</p>
          <p className="drawer-strong">Synced · 2m ago</p>
          <p className="muted">Region: us-central</p>
        </div>
        <div className="drawer-section">
          <p className="muted">Open events</p>
          <ul>
            <li>Plan sync in progress</li>
            <li>Subscription audit ready</li>
            <li>Metered usage ingestion lag: 2m</li>
          </ul>
        </div>
        <div className="drawer-section footer">
          <button className="ghost">Edit metadata</button>
          <button>View audit log</button>
        </div>
      </aside>

      {activeModal && (
        <div className="modal-backdrop" role="dialog">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{activeModal === 'create-product' ? 'Create product' : activeModal === 'create-plan' ? 'Create plan' : activeModal === 'create-metric' ? 'Create metric definition' : 'Create subscription'}</h3>
              <button onClick={() => setActiveModal(null)}>Close</button>
            </div>
            <p className="muted">This modal mirrors the specific creation flow for each domain.</p>
            <div className="modal-actions">
              <button onClick={() => setActiveModal(null)}>Dismiss</button>
              <button>Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
