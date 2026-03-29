import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { api } from '../api/api';
import TestTable from '../components/TestTable';
import ResultCard from '../components/ResultCard';
import {
  FileBarChart2, CheckCheck, XOctagon, AlertTriangle,
  Camera, TrendingUp, Percent
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

function ScreenshotViewer({ testCases }) {
  const [selected, setSelected] = useState(null);
  const failures = testCases.filter(tc => tc.screenshot);

  if (!failures.length) return null;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Camera size={16} className="text-warn" />
        <h2 className="section-header">Failure Screenshots</h2>
        <span className="ml-auto font-mono text-xs text-warn">{failures.length} failure{failures.length > 1 ? 's' : ''}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        {failures.map(tc => (
          <button
            key={tc.id}
            onClick={() => setSelected(selected?.id === tc.id ? null : tc)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
              selected?.id === tc.id ? 'border-warn shadow-glow-warn' : 'border-border hover:border-warn/40'
            }`}
          >
            <img src={tc.screenshot} alt={tc.id} className="w-full aspect-video object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <span className="font-mono text-xs text-warn">{tc.id}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-xl overflow-hidden border border-warn/20 bg-void page-enter">
          <div className="flex items-center justify-between px-4 py-2 bg-warn-dim border-b border-warn/20">
            <div className="flex items-center gap-2">
              <XOctagon size={13} className="text-warn" />
              <span className="font-mono text-xs text-warn font-medium">{selected.id}: {selected.title}</span>
            </div>
            <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary text-xs font-mono">close ✕</button>
          </div>
          <img src={selected.screenshot} alt={selected.id} className="w-full" />
          {selected.error && (
            <div className="px-4 py-3 bg-void border-t border-border">
              <p className="font-mono text-xs text-warn">{selected.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RegressionAlerts({ alerts }) {
  if (!alerts?.length) return null;
  return (
    <div className="glass-card p-5 border-warn/20">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-warn" />
        <h2 className="section-header">Regression Alerts</h2>
        <span className="ml-auto status-fail">{alerts.length} alert{alerts.length > 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-2">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-start gap-3 px-4 py-3 bg-warn-dim border border-warn/20 rounded-lg">
            <AlertTriangle size={14} className="text-warn mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">{alert.message}</p>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                {new Date(alert.detected_at).toLocaleString()} · severity: {alert.severity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    api.getReports().then(d => { setData(d); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3 text-text-secondary">
        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-sm">Loading reports...</span>
      </div>
    </div>
  );

  const lineData = {
    labels: data.history.map(h => h.date.slice(5)),
    datasets: [
      {
        label: 'Passed',
        data: data.history.map(h => h.passed),
        borderColor: '#00f5a0',
        backgroundColor: 'rgba(0,245,160,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#00f5a0',
      },
      {
        label: 'Failed',
        data: data.history.map(h => h.failed),
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255,107,107,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#ff6b6b',
      },
    ],
  };

  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#8888aa', font: { family: 'JetBrains Mono', size: 10 }, boxWidth: 10 } },
    },
    scales: {
      x: { ticks: { color: '#8888aa', font: { family: 'JetBrains Mono', size: 10 } }, grid: { color: 'rgba(30,30,46,0.8)' } },
      y: { ticks: { color: '#8888aa', font: { family: 'JetBrains Mono', size: 10 } }, grid: { color: 'rgba(30,30,46,0.8)' } },
    },
  };

  const TABS = ['overview', 'test cases', 'screenshots'];

  return (
    <div className="page-enter space-y-5">
      {/* Header */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-glow border border-accent/20 rounded-lg flex items-center justify-center">
              <FileBarChart2 size={16} className="text-accent" />
            </div>
            <div>
              <h2 className="section-header">Test Reports</h2>
              <p className="text-xs text-text-muted font-mono">Execution results and analytics</p>
            </div>
          </div>
          <div className="flex gap-1 bg-void rounded-lg border border-border p-1">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-display font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-accent text-white shadow-glow'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard title="Total Tests" value={data.total} icon={FileBarChart2} color="accent" />
        <ResultCard title="Passed" value={data.passed} icon={CheckCheck} color="neon"
          subtitle={`${data.pass_rate.toFixed(1)}% pass rate`} />
        <ResultCard title="Failed" value={data.failed} icon={XOctagon} color="warn" />
        <ResultCard title="Pass Rate" value={`${data.pass_rate.toFixed(0)}%`} icon={Percent} color="gold"
          subtitle="Above 80% target" />
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5 page-enter">
          <RegressionAlerts alerts={data.regression_alerts} />
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-accent" />
              <h2 className="section-header">Historical Trend</h2>
            </div>
            <div className="h-60">
              <Line data={lineData} options={chartOpts} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'test cases' && (
        <div className="page-enter">
          <TestTable testCases={data.test_cases} showSteps showError />
        </div>
      )}

      {activeTab === 'screenshots' && (
        <div className="page-enter">
          <ScreenshotViewer testCases={data.test_cases} />
        </div>
      )}
    </div>
  );
}
