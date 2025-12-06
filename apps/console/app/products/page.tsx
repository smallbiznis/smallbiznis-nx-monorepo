'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'In rollout' | 'Archived';
  plans: number;
  owner: string;
  lifecycle: string;
  metrics: string[];
  created: string;
  lastChange: string;
};

const productCatalog: Product[] = [
  {
    id: 'compute-mesh',
    name: 'Compute Mesh',
    code: 'compute-mesh',
    status: 'Active',
    plans: 3,
    owner: 'Platform Billing',
    lifecycle: 'GA · Multi-region',
    metrics: ['cpu_hours', 'data_transfer', 'build_minutes'],
    created: 'Jan 18, 2024',
    lastChange: '3d ago',
  },
  {
    id: 'messaging-fabric',
    name: 'Messaging Fabric',
    code: 'msg-fabric',
    status: 'Active',
    plans: 5,
    owner: 'Realtime Services',
    lifecycle: 'GA · Edge-ready',
    metrics: ['messages', 'connections', 'egress'],
    created: 'Feb 02, 2024',
    lastChange: '6h ago',
  },
  {
    id: 'storage-vault',
    name: 'Storage Vault',
    code: 'storage-vault',
    status: 'In rollout',
    plans: 2,
    owner: 'Data Systems',
    lifecycle: 'Beta · Limited release',
    metrics: ['storage_gb', 'iops', 'api_calls'],
    created: 'Mar 05, 2024',
    lastChange: '1w ago',
  },
  {
    id: 'insights-api',
    name: 'Insights API',
    code: 'insights-api',
    status: 'Active',
    plans: 4,
    owner: 'Analytics',
    lifecycle: 'GA · Usage-first',
    metrics: ['queries', 'rows_scanned', 'dashboards'],
    created: 'Apr 12, 2024',
    lastChange: '2d ago',
  },
  {
    id: 'edge-observability',
    name: 'Edge Observability',
    code: 'edge-obs',
    status: 'Archived',
    plans: 1,
    owner: 'Platform Billing',
    lifecycle: 'Sunset',
    metrics: ['traces', 'logs', 'metrics'],
    created: 'Sep 12, 2023',
    lastChange: '30d ago',
  },
];

const rollouts = [
  {
    title: 'Storage Vault launch checklist',
    items: ['Metering parity verified', 'Tiered pricing QA complete', 'Docs reviewed by finance'],
    owner: 'Data Systems',
    target: 'GA in June',
  },
  {
    title: 'Compute Mesh add-on refresh',
    items: ['New packaging for GPU hours', 'Migration plan for legacy tenants', 'Post-launch guardrails documented'],
    owner: 'Platform Billing',
    target: 'Preview next sprint',
  },
];

function statusTone(status: Product['status']) {
  if (status === 'Active') return { label: 'Active', color: '#16a34a' };
  if (status === 'Archived') return { label: 'Archived', color: '#b91c1c' };
  return { label: 'In rollout', color: '#f59e0b' };
}

export default function ProductsPage() {
  const [statusFilter, setStatusFilter] = useState<Product['status'] | 'All'>('All');
  const [ownerFilter, setOwnerFilter] = useState<string>('All');

  const filteredCatalog = useMemo(() => {
    return productCatalog.filter((product) => {
      const statusMatch = statusFilter === 'All' || product.status === statusFilter;
      const ownerMatch = ownerFilter === 'All' || product.owner === ownerFilter;
      return statusMatch && ownerMatch;
    });
  }, [ownerFilter, statusFilter]);

  const activeCount = productCatalog.filter((p) => p.status === 'Active').length;
  const rolloutCount = productCatalog.filter((p) => p.status === 'In rollout').length;

  return (
    <main className="console-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Products &amp; pricing</p>
          <h1>Product catalog orchestration</h1>
          <p className="hero-copy">
            Govern GA, beta, and experimental products with full visibility into plans, meter coverage, and rollout guardrails.
            Curate the catalog that downstream tenants and teams rely on.
          </p>
          <div className="hero-actions">
            <button>Create product</button>
            <button className="ghost">Draft pricing model</button>
          </div>
        </div>
        <div className="json-view">
          <strong>Product health</strong>
          <p className="muted">{activeCount} active · {rolloutCount} in rollout · {productCatalog.length} total</p>
          <pre>{`rollouts: ${rolloutCount}\nexperiments: 2\nlast audit: 6h ago`}</pre>
        </div>
      </section>

      <section className="stats-grid">
        {[{
          label: 'Active product lines',
          value: `${activeCount} / ${productCatalog.length}`,
          trend: '99.9% billing coverage',
        },
        {
          label: 'Plans mapped',
          value: productCatalog.reduce((sum, product) => sum + product.plans, 0).toString(),
          trend: 'Previews & GA cohorts',
        },
        {
          label: 'Meter coverage',
          value: '21 metrics',
          trend: '14 monitored in real time',
        },
        {
          label: 'Recent changes',
          value: '6 in last 24h',
          trend: 'Requires finance sign-off',
        }].map((item) => (
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
            <div>
              <h2>Product catalog</h2>
              <p className="muted">Track lifecycle, owners, and meter readiness.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as Product['status'] | 'All')}>
                <option value="All">All status</option>
                <option value="Active">Active</option>
                <option value="In rollout">In rollout</option>
                <option value="Archived">Archived</option>
              </select>
              <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
                <option value="All">All owners</option>
                {[...new Set(productCatalog.map((product) => product.owner))].map((owner) => (
                  <option value={owner} key={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Lifecycle</th>
                  <th>Plans</th>
                  <th>Metrics</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.map((product) => {
                  const tone = statusTone(product.status);
                  return (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                        <div className="muted">{product.code}</div>
                      </td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '6px 10px',
                            borderRadius: 999,
                            background: 'var(--panel-alt)',
                            border: '1px solid var(--border)',
                            color: tone.color,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {tone.label}
                        </span>
                      </td>
                      <td>{product.owner}</td>
                      <td>{product.lifecycle}</td>
                      <td>{product.plans} plans</td>
                      <td>{product.metrics.join(', ')}</td>
                      <td>{product.lastChange}</td>
                      <td className="table-actions">
                        <Link href={`/products/${product.id}`} className="ghost">
                          View
                        </Link>
                        <button className="ghost">Clone</button>
                        <button className="danger">Archive</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <header>
            <h2>Rollouts &amp; guardrails</h2>
            <span className="eyebrow">Coordination</span>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Track</th>
                  <th>Tasks</th>
                  <th>Owner</th>
                  <th>Target</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                {rollouts.map((rollout) => (
                  <tr key={rollout.title}>
                    <td>{rollout.title}</td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {rollout.items.map((item) => (
                          <li key={item} style={{ color: 'var(--muted)' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{rollout.owner}</td>
                    <td>{rollout.target}</td>
                    <td>
                      <span className="muted">Launch readout ready</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="json-view">
            <strong>Automation</strong>
            <p className="muted">Webhook will pause self-serve if rollout checklist is incomplete.</p>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <header>
            <h2>Pricing model drafts</h2>
            <button className="ghost">View archive</button>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Applies to</th>
                  <th>Construct</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Compute Mesh usage packs</td>
                  <td>Compute Mesh</td>
                  <td>Committed + overage</td>
                  <td>In review</td>
                  <td>Finance</td>
                  <td>Use blended GPU hours</td>
                </tr>
                <tr>
                  <td>Messaging Fabric enterprise</td>
                  <td>Messaging Fabric</td>
                  <td>Tiered + minimum</td>
                  <td>Draft</td>
                  <td>Product Ops</td>
                  <td>Requires webhook alerts</td>
                </tr>
                <tr>
                  <td>Storage Vault cold tier</td>
                  <td>Storage Vault</td>
                  <td>Package</td>
                  <td>Proposed</td>
                  <td>Data Systems</td>
                  <td>Preview for 3 tenants</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <header>
            <h2>Create a product</h2>
            <span className="eyebrow">Quick scaffold</span>
          </header>
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              Product name
              <input required placeholder="Observability Edge" />
            </label>
            <label>
              Product code
              <input required placeholder="edge-observability" />
            </label>
            <label>
              Lifecycle stage
              <select>
                <option>Draft</option>
                <option>Beta</option>
                <option>GA</option>
              </select>
            </label>
            <label>
              Owning team
              <select>
                <option>Platform Billing</option>
                <option>Realtime Services</option>
                <option>Data Systems</option>
                <option>Analytics</option>
              </select>
            </label>
            <label>
              Connected metrics
              <textarea rows={4} placeholder="cpu_hours, data_transfer, build_minutes" />
            </label>
            <div className="form-actions">
              <button className="ghost">Save as draft</button>
              <button>Create product</button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
}
