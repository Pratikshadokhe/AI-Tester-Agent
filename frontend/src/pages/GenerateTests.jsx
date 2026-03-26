import { useState } from 'react';
// import { mockApi } from '../api/api';
import TestTable from '../components/TestTable';
import { FlaskConical, Sparkles, AlertCircle, ShieldAlert, FileText } from 'lucide-react';
import { api } from '../api/api';

export default function GenerateTests() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [issueKey, setIssueKey] = useState('')
  const [fetchingJira, setFetchingJira] = useState(false)

  const [jiraSource, setJiraSource] = useState(null)

  const handleFetchJira = async () => {
    if (!issueKey.trim()) {
      setError('Please enter a Jira Issue Key.');
      return;
    }

    setFetchingJira(true);
    setError(null);
    setResult(null);

    try {
      const data = await api.fetchJiraIssue(issueKey);

      // directly show results
      setForm({
        title: data.title || '',
        description: data.description || ''
      })

      setResult(data);

      setJiraSource(issueKey)

      localStorage.setItem("jiraId", issueKey);

    } catch (e) {
      setError('Failed to fetch Jira issue. Check key or permissions.');
    } finally {
      setFetchingJira(false);
    }
  };
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await api.generateTests({ title: form.title, description: form.description });
      setResult(data);
      
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const riskScore = result?.risk?.score || 0;
  const riskLabel = result?.risk?.risk || "LOW";

  const riskColor =
    riskLabel === "HIGH" ? "warn" :
    riskLabel === "MEDIUM" ? "gold" :
    "neon";

  const userStoryTitle = result?.User_Story_Title
  ? `${result.analysis.actor} - ${result.User_Story_Title}`
  : "User Story";

  const userStoryDescription = result?.context?.query_used || "No description available"; 

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
          {/* Jira Integration */}
          <div className="glass-card p-4 border border-accent/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent-glow rounded-lg flex items-center justify-center">
                <FileText size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Import from Jira</p>
                <p className="text-xs text-text-muted font-mono">Fetch user story automatically</p>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="input-field"
                placeholder="Enter Issue Key (e.g. IPS2-20)"
                value={issueKey}
                onChange={(e) => setIssueKey(e.target.value)}
              />

              <button
                className="btn-secondary flex items-center gap-2"
                onClick={handleFetchJira}
                disabled={fetchingJira}
              >
                {fetchingJira ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <FileText size={14} />
                    <span>Fetch</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="label block mb-2">User Story Title</label>
            {jiraSource && (
              <div className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-2 rounded-lg">
                🔗 Fetched from Jira Issue: <span className="font-semibold">{jiraSource}</span>
              </div>
            )}
            <input
              type="text"
              className="input-field"
              placeholder="e.g. User Authentication Flow"
              value={userStoryTitle}
              readOnly={!!jiraSource}
            />
          </div>

          <div>
            <label className="label block mb-2">User Story Description</label>
            <textarea
              className="input-field min-h-32 resize-y"
              placeholder="As a user, I want to log in with my email and password so that I can access my account securely..."
              value={userStoryDescription}
              readOnly={!!jiraSource}
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
                onClick={() => { setResult(null); setForm({ title: '', description: '' }); 
                setJiraSource(null)
              }}
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
      {!result && !loading && (
        <div className="glass-card p-6 text-center text-text-muted font-mono">
          ⚡ Enter a user story or fetch from Jira to generate AI-powered test cases
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4 page-enter">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <FileText size={14} className="text-accent" />
              <span className="text-sm text-text-secondary font-mono">{result.tests.length} test cases generated</span>
            </div>
            <div className={`glass-card px-4 py-2 flex items-center gap-2 ${
              riskColor === 'warn' ? 'border-warn/30' : riskColor === 'gold' ? 'border-gold/30' : 'border-neon/30'
            }`}>
              <ShieldAlert
                size={14}
                className={
                  riskColor === 'warn' ? 'text-warn' :
                  riskColor === 'gold' ? 'text-gold' :
                  'text-neon'
                }
              />

             <span className={`text-sm font-mono ${
                riskColor === 'warn' ? 'text-warn' :
                riskColor === 'gold' ? 'text-gold' :
                'text-neon'
              }`}>Risk: {riskLabel} ({Math.round(riskScore)})</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <span className="text-xs text-text-muted font-mono">
                Generated {new Date(result.generated_at || Date.now()).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* AI Summary */}
          <div className="text-sm text-text-secondary space-y-2">
            {result.ai_summary
              ?.split(/\d+\.\s+/) // split on "1. 2. 3."
              .filter(Boolean)
              .map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{point.trim()}</span>
                </div>
              ))}
          </div>
          {/* AI summary end */}

          {/* Defects */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={16} className="text-warn" />
              <p className="font-semibold text-text-primary">Detected Defects</p>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {result.defects?.map((d, i) => (
                <div key={i} className="border border-white/10 rounded-lg p-3 flex justify-between">
                  <span className="text-sm text-text-secondary">{d.description}</span>
                  <span className={`text-xs font-mono px-2 py-1 rounded 
                    ${d.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      d.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      d.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                    {d.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Defects end */}

          {/* Learning */}
          <div className="glass-card p-4 border border-neon/20">
            <p className="text-xs font-mono text-text-muted">
              🧠 {result.learning.message}
            </p>
          </div>
          {/* Learning end */}

          <TestTable testCases={result.tests} />
        </div>
      )}
    </div>
  );
}
