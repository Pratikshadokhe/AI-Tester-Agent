import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, Clock, Circle, AlertTriangle } from 'lucide-react';
import React from 'react';


function PriorityTag({ priority }) {
  const map = {
    critical: 'tag-critical',
    high: 'tag-high',
    medium: 'tag-medium',
    low: 'tag-low',
  };
  return <span className={map[priority] || 'tag bg-muted text-text-secondary'}>{priority}</span>;
}

function StatusBadge({ status }) {
  if (!status || status === 'pending') return (
    <span className="status-pending"><Circle size={7} className="fill-current" />pending</span>
  );
  if (status === 'pass') return (
    <span className="status-pass"><CheckCircle2 size={10} />pass</span>
  );
  if (status === 'fail') return (
    <span className="status-fail"><XCircle size={10} />fail</span>
  );
  if (status === 'running') return (
    <span className="status-running"><Clock size={10} className="animate-spin" />running</span>
  );
  return null;
}

function StepList({ steps, stepsResult }) {
  return (
    <div className="mt-3 space-y-1.5 pl-2 border-l border-accent/20">
      {steps.map((step, i) => {
        const result = stepsResult?.[i];
        const st = result?.status;
        return (
          <div key={i} className="flex items-start gap-2 text-xs">
            {st === 'pass' ? (
              <CheckCircle2 size={12} className="text-neon mt-0.5 flex-shrink-0" />
            ) : st === 'fail' ? (
              <XCircle size={12} className="text-warn mt-0.5 flex-shrink-0" />
            ) : (
              <Circle size={12} className="text-text-muted mt-0.5 flex-shrink-0" />
            )}
            <span className={`font-mono leading-relaxed ${st === 'fail' ? 'text-warn' : st === 'pass' ? 'text-text-secondary' : 'text-text-muted'}`}>
              {step}
              {result?.duration_ms && (
                <span className="ml-2 text-text-muted">{result.duration_ms}ms</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function TestTable({ testCases = [], showSteps = false, showError = false }) {
  const [expanded, setExpanded] = useState(null);

  console.log("Test Cases in Test-Table: ",testCases);

  if (!testCases.length) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-12 h-12 bg-accent-glow rounded-full flex items-center justify-center mx-auto mb-3 border border-accent/20">
          <AlertTriangle size={20} className="text-accent" />
        </div>
        <p className="text-text-secondary text-sm">No test cases yet</p>
        <p className="text-text-muted text-xs mt-1">Generate tests from the Generate page</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="w-8" />
            <th className="label px-4 py-3 text-left">ID</th>
            <th className="label px-4 py-3 text-left">Title</th>
            <th className="label px-4 py-3 text-left">Category</th>
            <th className="label px-4 py-3 text-left">Priority</th>
            <th className="label px-4 py-3 text-left">Status</th>
            {showSteps && <th className="label px-4 py-3 text-left">Duration</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {testCases.map((tc, index) => (
            <React.Fragment key={tc.id || index}>
              <tr
                className="table-row-hover cursor-pointer"
                onClick={() => setExpanded(expanded === tc.id ? null : tc.id)}
              >
                <td className="pl-3 pr-1 py-3">
                  <button className="text-text-muted hover:text-text-secondary transition-colors">
                    {expanded === tc.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-accent">{tc.id}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-white font-body">{tc.title}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-text-muted bg-muted px-2 py-0.5 rounded">{tc.category}</span>
                </td>
                <td className="px-4 py-3">
                  <PriorityTag priority={tc.severity} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={tc.status} />
                </td>
                {showSteps && (
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-text-muted">
                      {tc.duration_ms || tc.result?.duration_ms
  ? `${tc.duration_ms || tc.result?.duration_ms}ms`
  : '—'}
                    </span>
                  </td>
                )}
              </tr>

              {expanded === tc.id && (
                <tr className="bg-void/40">
                  <td colSpan={showSteps ? 7 : 6} className="px-5 pb-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="label mb-2">Test Steps</p>
                        <StepList steps={tc.steps} stepsResult={tc.steps_result} />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="label mb-1.5">Expected Result</p>
                          <p className="text-xs text-text-secondary font-mono bg-panel border border-border rounded px-3 py-2">
                            {tc.expected}
                          </p>
                        </div>
                        {showError && tc.error && (
                          <div>
                            <p className="label mb-1.5 text-warn">Error</p>
                            <p className="text-xs text-warn font-mono bg-warn-dim border border-warn/20 rounded px-3 py-2">
                              {tc.error}
                            </p>
                          </div>
                        )}
                        {tc.screenshot && (
                          <div>
                            <p className="label mb-1.5">Failure Screenshot</p>
                            <img
                              src={tc.screenshot}
                              alt="Failure screenshot"
                              className="rounded border border-warn/20 w-full max-w-xs"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
