'use client';

import { useMemo, useState } from 'react';

type MeterDraft = {
  name: string;
  code: string;
  aggregation: string;
  unit: string;
  window: string;
  description: string;
  sampleEvent: string;
};

type MeterEditorProps = {
  meter?: Partial<MeterDraft>;
  onSave?: (draft: MeterDraft) => void;
};

export default function MeterEditor({ meter, onSave }: MeterEditorProps) {
  const [draft, setDraft] = useState<MeterDraft>({
    name: meter?.name ?? 'API Calls',
    code: meter?.code ?? 'api_calls',
    aggregation: meter?.aggregation ?? 'sum',
    unit: meter?.unit ?? 'call',
    window: meter?.window ?? 'per minute',
    description: meter?.description ?? 'Tracks authenticated requests across tenants',
    sampleEvent:
      meter?.sampleEvent ??
      `{"tenant_id":"tenant_123","meter":"api_calls","value":1,"endpoint":"/v1/usage","metadata":{"region":"us-central"}}`,
  });

  const signal = useMemo(() => {
    const codeLength = draft.code.length;
    const hasSpaces = draft.code.includes(' ');
    if (hasSpaces) return 'Codes should use snake_case without spaces';
    if (codeLength < 4) return 'Code looks short — add something descriptive';
    return 'Ready to publish to metering control plane';
  }, [draft.code]);

  return (
    <article className="card">
      <header>
        <h2>Meter editor</h2>
        <span className="eyebrow">Meter composer</span>
      </header>
      <form
        className="form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          onSave?.(draft);
        }}
      >
        <label>
          Meter name
          <input
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            required
            placeholder="API Calls"
          />
        </label>
        <label>
          Meter code
          <input
            value={draft.code}
            onChange={(event) => setDraft({ ...draft, code: event.target.value })}
            required
            placeholder="api_calls"
          />
        </label>
        <label>
          Aggregation
          <select value={draft.aggregation} onChange={(event) => setDraft({ ...draft, aggregation: event.target.value })}>
            <option value="sum">Sum</option>
            <option value="count">Count</option>
            <option value="max">Max</option>
            <option value="unique">Unique</option>
          </select>
        </label>
        <label>
          Unit
          <input
            value={draft.unit}
            onChange={(event) => setDraft({ ...draft, unit: event.target.value })}
            placeholder="call"
          />
        </label>
        <label>
          Rollup window
          <select value={draft.window} onChange={(event) => setDraft({ ...draft, window: event.target.value })}>
            <option value="per minute">Per minute</option>
            <option value="per hour">Per hour</option>
            <option value="per day">Per day</option>
          </select>
        </label>
        <label>
          Description
          <textarea
            rows={3}
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
        </label>
        <label>
          Sample event (JSON)
          <textarea
            className="json-editor"
            rows={4}
            value={draft.sampleEvent}
            onChange={(event) => setDraft({ ...draft, sampleEvent: event.target.value })}
          />
        </label>
        <div className="json-view">
          <strong>Validator</strong>
          <p className="muted">{signal}</p>
          <pre>{`aggregation: ${draft.aggregation}\nunit: ${draft.unit}\nwindow: ${draft.window}`}</pre>
        </div>
        <div className="form-actions">
          <button className="ghost" type="button" onClick={() => setDraft({ ...draft, sampleEvent: '' })}>
            Clear event
          </button>
          <button type="submit">Save meter</button>
        </div>
      </form>
    </article>
  );
}
