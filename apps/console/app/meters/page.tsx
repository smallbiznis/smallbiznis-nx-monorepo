'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import MeterEditor from './meter-editor';

type MeterDefinition = {
  name: string;
  code: string;
  aggregation: string;
  window: string;
  status: 'Active' | 'Draft' | 'Paused';
  owner: string;
  lastUsed: string;
};

const meterDefinitions: MeterDefinition[] = [
  {
    name: 'API Calls',
    code: 'api_calls',
    aggregation: 'sum',
    window: 'per minute',
    status: 'Active',
    owner: 'Platform Billing',
    lastUsed: '5m ago',
  },
  {
    name: 'Storage GB',
    code: 'storage_gb',
    aggregation: 'max',
    window: 'per hour',
    status: 'Draft',
    owner: 'Data Systems',
    lastUsed: '1d ago',
  },
  {
    name: 'Messages',
    code: 'messages',
    aggregation: 'count',
    window: 'per minute',
    status: 'Active',
    owner: 'Realtime Services',
    lastUsed: '2m ago',
  },
  {
    name: 'Queries',
    code: 'queries',
    aggregation: 'sum',
    window: 'per minute',
    status: 'Paused',
    owner: 'Analytics',
    lastUsed: '3d ago',
  },
];

export default function MetersPage() {
  const [activeMeter, setActiveMeter] = useState<MeterDefinition>(meterDefinitions[0]);
  const [lastSave, setLastSave] = useState<string>('Not saved in this session');

  const liveMetrics = useMemo(
    () => [
      { label: 'Live ingestion', value: '138k events / min', trend: '+4% vs hour ago' },
      { label: 'On-time delivery', value: '99.4%', trend: 'SLO 99%' },
      { label: 'Meters deployed', value: `${meterDefinitions.length}`, trend: '2 drafts pending review' },
    ],
    []
  );

  return (
    <main className="console-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Usage &amp; metering</p>
          <h1>Metering control plane</h1>
          <p className="hero-copy">
            Define and iterate on meters, validate ingestion payloads, and monitor the billing signals that power pricing.
            Everything stays versioned and scoped to the products that depend on them.
          </p>
          <div className="hero-actions">
            <button>New meter</button>
            <button className="ghost">Simulate event</button>
          </div>
        </div>
        <div className="json-view">
          <strong>Session status</strong>
          <p className="muted">{lastSave}</p>
          <pre>{`active_meter: ${activeMeter.code}\nowner: ${activeMeter.owner}\nwindow: ${activeMeter.window}`}</pre>
        </div>
      </section>

      <section className="stats-grid">
        {liveMetrics.map((metric) => (
          <article key={metric.label} className="card compact">
            <p className="eyebrow">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p className="muted">{metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="card table-card">
          <header>
            <div>
              <h2>Meter inventory</h2>
              <p className="muted">Attach meters to plans and products with confidence.</p>
            </div>
            <select value={activeMeter.code} onChange={(event) => {
              const selected = meterDefinitions.find((meter) => meter.code === event.target.value);
              if (selected) setActiveMeter(selected);
            }}>
              {meterDefinitions.map((meter) => (
                <option key={meter.code} value={meter.code}>
                  {meter.name}
                </option>
              ))}
            </select>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Meter</th>
                  <th>Code</th>
                  <th>Aggregation</th>
                  <th>Window</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Last used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meterDefinitions.map((meter) => (
                  <tr key={meter.code}>
                    <td>{meter.name}</td>
                    <td>{meter.code}</td>
                    <td>{meter.aggregation}</td>
                    <td>{meter.window}</td>
                    <td>{meter.status}</td>
                    <td>{meter.owner}</td>
                    <td>{meter.lastUsed}</td>
                    <td className="table-actions">
                      <button className="ghost" onClick={() => setActiveMeter(meter)}>
                        Edit
                      </button>
                      <button className="danger">Disable</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="loading-state">Signal: ingestion SLAs healthy</div>
        </article>

        <article className="card">
          <header>
            <h2>Ingestion monitor</h2>
            <span className="eyebrow">Realtime</span>
          </header>
          <div className="chart-grid">
            {[15, 30, 45, 55, 65, 72, 68].map((value, index) => (
              <div key={index}>
                <p>Minute {index + 1}</p>
                <div className="sparkline">
                  <span style={{ height: `${value}%`, background: index === 5 ? '#38bdf8' : '#2563eb' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="json-view">
            <strong>Alerts</strong>
            <p className="muted">Trigger an alert when ingestion falls below threshold or spikes unexpectedly.</p>
            <pre>{`dropping_below: 92%\nspike_threshold: 30%\nnotification: on-call`}</pre>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <MeterEditor
          meter={activeMeter}
          onSave={(draft) => setLastSave(`Saved ${draft.code} · ${new Date().toLocaleTimeString()}`)}
        />

        <article className="card">
          <header>
            <h2>Product &amp; plan mapping</h2>
            <Link href="/products" className="ghost">
              Products
            </Link>
          </header>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Plans</th>
                  <th>Attached meters</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Compute Mesh</td>
                  <td>Enterprise Plus, Growth</td>
                  <td>cpu_hours, data_transfer</td>
                  <td>Healthy</td>
                </tr>
                <tr>
                  <td>Messaging Fabric</td>
                  <td>Developer Starter, Enterprise</td>
                  <td>messages, connections</td>
                  <td>On-track</td>
                </tr>
                <tr>
                  <td>Storage Vault</td>
                  <td>Atlas, Cold tier</td>
                  <td>storage_gb, iops</td>
                  <td>Preview</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-actions">
            <button className="ghost">Detach meter</button>
            <button>Attach to plan</button>
          </div>
        </article>
      </section>
    </main>
  );
}
