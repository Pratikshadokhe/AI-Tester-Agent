import { useState } from 'react';
import { mockApi } from '../api/api';
import TestTable from '../components/TestTable';
import { FlaskConical, Sparkles, AlertCircle, ShieldAlert, FileText } from 'lucide-react';

export default function GenerateTests() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await mockApi.generateTests({ title: form.title, description: form.description });
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const riskColor = result?.risk_score >= 70 ? 'warn' : result?.risk_score >= 40 ? 'gold' : 'neon';
  const riskLabel = result?.risk_score >= 70 ? 'HIGH' : result?.risk_score >= 40 ? 'MEDIUM' : 'LOW';

  return (
    <div className="page-enter space-y-6">
      {/* Form */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-accent-glow border border-accent/20 rounded-lg flex items-center justify-center">
            <FlaskConical size={16} className="text-accent" />
          </div>
          <div>
            <h2 className="section-header">Generate Test Cases</h2>
            <p className="text-xs text-text-muted font-mono mt-0.5">AI-powered test generation from user stories</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label block mb-2">User Story Title</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. User Authentication Flow"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="label block mb-2">User Story Description</label>
            <textarea
              className="input-field min-h-32 resize-y"
              placeholder="As a user, I want to log in with my email and password so that I can access my account securely..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-warn bg-warn-dim border border-warn/20 rounded-lg px-4 py-3">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span className="text-sm font-mono">{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              className="btn-primary flex items-center gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Generate Test Cases</span>
                </>
              )}
            </button>

            {result && (
              <button
                className="btn-secondary"
                onClick={() => { setResult(null); setForm({ title: '', description: '' }); }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="glass-card p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={18} className="text-accent" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-text-primary font-display font-semibold mb-1">AI is analyzing your user story</p>
              <p className="text-text-muted text-sm font-mono">Generating comprehensive test cases...</p>
            </div>
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full progress-shimmer rounded-full animate-progress" />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-4 page-enter">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <FileText size={14} className="text-accent" />
              <span className="text-sm text-text-secondary font-mono">{result.test_cases.length} test cases generated</span>
            </div>
            <div className={`glass-card px-4 py-2 flex items-center gap-2 ${
              riskColor === 'warn' ? 'border-warn/30' : riskColor === 'gold' ? 'border-gold/30' : 'border-neon/30'
            }`}>
              <ShieldAlert size={14} className={`text-${riskColor}`} />
              <span className={`text-sm font-mono text-${riskColor}`}>Risk: {riskLabel} ({result.risk_score})</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <span className="text-xs text-text-muted font-mono">
                Generated {new Date(result.generated_at).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <TestTable testCases={result.test_cases} />
        </div>
      )}
    </div>
  );
}
