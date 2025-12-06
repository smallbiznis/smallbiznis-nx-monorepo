'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type ProductDetail = {
  id: string;
  name: string;
  tagline: string;
  status: 'Active' | 'In rollout' | 'Archived';
  lifecycle: string;
  owner: string;
  plans: { name: string; model: string; price: string; status: string; kpi: string }[];
  meters: string[];
  summary: string;
  updated: string;
  runbook: string;
};

const catalogDetails: Record<string, ProductDetail> = {
  'compute-mesh': {
    id: 'compute-mesh',
    name: 'Compute Mesh',
    tagline: 'GPU-powered compute fleet with guaranteed SLAs.',
    status: 'Active',
    lifecycle: 'GA · Multi-region',
    owner: 'Platform Billing',
    meters: ['cpu_hours', 'data_transfer', 'gpu_hours'],
    summary:
      'Orchestrated compute fabrics with per-tenant governance, high-availability routing, and optional GPU add-ons.',
    updated: '3d ago',
    runbook: 'Sync to Salesforce weekly, enforce GPU add-on minimums for enterprise tenants.',
    plans: [
      { name: 'Enterprise Plus', model: 'Committed + overage', price: '$1,200 / mo', status: 'Active', kpi: 'NPS 47' },
      { name: 'Growth', model: 'Tiered', price: '$320 / mo', status: 'Active', kpi: 'Churn 1.2%' },
      { name: 'Pilot', model: 'Usage-based', price: '$0.09 / cpu_hour', status: 'In rollout', kpi: '3 pilots' },
    ],
  },
  'messaging-fabric': {
    id: 'messaging-fabric',
    name: 'Messaging Fabric',
    tagline: 'Edge-aware messaging network with smart routing.',
    status: 'Active',
    lifecycle: 'GA · Edge-ready',
    owner: 'Realtime Services',
    meters: ['messages', 'connections', 'egress'],
    summary: 'Always-on messaging backbone with intelligent retries and per-tenant QoS policies.',
    updated: '6h ago',
    runbook: 'Rotate signing keys monthly. Require webhook acknowledgements before plan changes.',
    plans: [
      { name: 'Developer Starter', model: 'Usage-based', price: '$0.10 / msg', status: 'Active', kpi: '92% API success' },
      { name: 'Enterprise', model: 'Tiered + minimum', price: '$2,400 commit', status: 'Active', kpi: 'Latency P95 85ms' },
      { name: 'Legacy uplift', model: 'Package', price: '$1,050 / mo', status: 'Archived', kpi: 'Sunsetting' },
    ],
  },
  'storage-vault': {
    id: 'storage-vault',
    name: 'Storage Vault',
    tagline: 'Multi-cloud storage tiering with aggressive durability.',
    status: 'In rollout',
    lifecycle: 'Beta · Limited release',
    owner: 'Data Systems',
    meters: ['storage_gb', 'iops', 'api_calls'],
    summary: 'Unified object storage fabric with tiered retention policies and cold-storage offloading.',
    updated: '1w ago',
    runbook: 'Gate keep GA behind migration checklist and parity tests for metering.',
    plans: [
      { name: 'Atlas', model: 'Tiered', price: '$0.05 - $0.02 / GB', status: 'In rollout', kpi: '3 preview tenants' },
      { name: 'Cold tier', model: 'Package', price: '$189 / mo', status: 'Draft', kpi: 'Pending approval' },
      { name: 'Legacy import', model: 'Usage-based', price: '$0.02 / GB', status: 'Archived', kpi: 'Migration only' },
    ],
  },
};

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = catalogDetails[params.productId] ?? catalogDetails['compute-mesh'];
  const [activePlan, setActivePlan] = useState(product.plans[0]?.name ?? '');

  const planPreview = useMemo(() => product.plans.find((plan) => plan.name === activePlan), [activePlan, product.plans]);

  return (
    <main className="console-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Product profile</p>
          <h1>{product.name}</h1>
          <p className="hero-copy">{product.tagline}</p>
          <div className="hero-actions">
            <button>Edit product</button>
            <button className="ghost">Export spec</button>
            <Link href="/products" className="ghost">
              Back to catalog
            </Link>
          </div>
        </div>
        <div className="json-view">
          <strong>{product.lifecycle}</strong>
          <p className="muted">{product.meters.length} metrics · Owner {product.owner}</p>
          <pre>{`status: ${product.status}\nlast_change: ${product.updated}\nrunbook: ${product.runbook}`}</pre>
        </div>
      </section>

      <section className="grid-2">
        <article className="card">
          <header>
            <h2>Plans</h2>
            <select value={activePlan} onChange={(event) => setActivePlan(event.target.value)}>
              {product.plans.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                {product.plans.map((plan) => (
                  <tr key={plan.name}>
                    <td>{plan.name}</td>
                    <td>{plan.model}</td>
                    <td>{plan.price}</td>
                    <td>{plan.status}</td>
                    <td>{plan.kpi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {planPreview && (
            <div className="json-view">
              <strong>{planPreview.name} preview</strong>
              <p className="muted">{planPreview.model}</p>
              <pre>{`price: ${planPreview.price}\nstatus: ${planPreview.status}\nsignal: ${planPreview.kpi}`}</pre>
            </div>
          )}
        </article>

        <article className="card">
          <header>
            <h2>Meter coverage</h2>
            <span className="eyebrow">Product specific</span>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Meter</th>
                  <th>Purpose</th>
                  <th>Health</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.meters.map((meter) => (
                  <tr key={meter}>
                    <td>{meter}</td>
                    <td>Attached to usage-based plans</td>
                    <td>Monitored</td>
                    <td className="table-actions">
                      <Link className="ghost" href="/meters">
                        View meter
                      </Link>
                      <button className="ghost">Detach</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="loading-state">Signal: ingestion at 98th percentile under SLO.</div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <header>
            <h2>Product narrative</h2>
            <span className="eyebrow">Runbook</span>
          </header>
          <p className="muted">{product.summary}</p>
          <ul>
            <li>Latest update: {product.updated}</li>
            <li>Owner: {product.owner}</li>
            <li>Lifecycle: {product.lifecycle}</li>
          </ul>
          <div className="json-view">
            <pre>{product.runbook}</pre>
          </div>
        </article>

        <article className="card">
          <header>
            <h2>Compliance &amp; safety</h2>
            <span className="eyebrow">Guardrails</span>
          </header>
          <div className="settings-grid">
            <label>
              Version gating
              <select>
                <option>Require sign-off</option>
                <option>Auto-publish</option>
              </select>
            </label>
            <label>
              Metering audit
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </label>
            <label>
              Invoice visibility
              <select>
                <option>Include taxes</option>
                <option>Hide taxes</option>
              </select>
            </label>
            <label>
              Self-serve availability
              <select>
                <option>Enabled</option>
                <option>Paused</option>
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button className="ghost">Save draft</button>
            <button>Publish changes</button>
          </div>
        </article>
      </section>
    </main>
  );
}
