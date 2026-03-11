import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title,
  Tooltip, Legend, ArcElement
} from 'chart.js';
import { mockApi } from '../api/api';
import ResultCard from '../components/ResultCard';
import { TestTube2, CheckCheck, XOctagon, ShieldAlert, Clock, Zap } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CHART_DEFAULTS = {
  color: '#8888aa',
  font: { family: 'JetBrains Mono', size: 10 },
};

function RiskGauge({ score }) {
  const color = score < 40 ? '#00f5a0' : score < 70 ? '#ffd166' : '#ff6b6b';
  const deg = Math.round((score / 100) * 180);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-14 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full" style={{
          background: 'conic-gradient(from 180deg at 50% 100%, #ff6b6b 0deg, #ffd166 60deg, #00f5a0 120deg, transparent 180deg)',
          opacity: 0.15
        }} />
        <div className="absolute inset-0 rounded-t-full border-4 border-b-0 border-muted" />
        <div className="absolute bottom-0 left-1/2 w-0.5 h-12 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${deg - 90}deg)`, background: color, borderRadius: '1px' }}>
          <div className="w-2 h-2 rounded-full absolute -top-1 -left-0.5" style={{ background: color }} />
        </div>
      </div>
      <div className="font-display font-bold text-2xl" style={{ color }}>{score}</div>
      <div className="text-xs text-text-muted font-mono">risk score</div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getDashboard().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3 text-text-secondary">
        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-sm">Loading dashboard...</span>
      </div>
    </div>
  );

  const barData = {
    labels: data.trend.map(d => d.label),
    datasets: [
      {
        label: 'Passed',
        data: data.trend.map(d => d.passed),
        backgroundColor: 'rgba(0,245,160,0.6)',
        borderColor: '#00f5a0',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Failed',
        data: data.trend.map(d => d.failed),
        backgroundColor: 'rgba(255,107,107,0.6)',
        borderColor: '#ff6b6b',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(data.categories),
    datasets: [{
      data: Object.values(data.categories),
      backgroundColor: ['rgba(108,99,255,0.7)', 'rgba(0,245,160,0.7)', 'rgba(255,209,102,0.7)', 'rgba(255,107,107,0.7)'],
      borderColor: ['#6c63ff', '#00f5a0', '#ffd166', '#ff6b6b'],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { ...CHART_DEFAULTS, color: '#8888aa', boxWidth: 10 } },
      tooltip: { bodyFont: CHART_DEFAULTS.font, titleFont: CHART_DEFAULTS.font },
    },
    scales: {
      x: { ticks: { ...CHART_DEFAULTS }, grid: { color: 'rgba(30,30,46,0.8)' } },
      y: { ticks: { ...CHART_DEFAULTS }, grid: { color: 'rgba(30,30,46,0.8)' } },
    },
  };

  const passRate = data.total_tests > 0 ? ((data.passed / data.total_tests) * 100).toFixed(1) : 0;

  return (
    <div className="page-enter space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <ResultCard title="Total Tests" value={data.total_tests} icon={TestTube2}
          subtitle="Across all suites" color="accent" trend="up" trendValue="+3 today" />
        <ResultCard title="Passed" value={data.passed} icon={CheckCheck}
          subtitle={`${passRate}% pass rate`} color="neon" trend="up" trendValue="+1" />
        <ResultCard title="Failed" value={data.failed} icon={XOctagon}
          subtitle="Needs attention" color="warn" trend="down" trendValue="-2" />
        <div className="metric-card flex items-center justify-center">
          <RiskGauge score={data.risk_score} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-header">Weekly Trend</h2>
            <span className="tag bg-neon-dim text-neon border border-neon/20">last 7 days</span>
          </div>
          <div className="h-52">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-header">By Category</h2>
          </div>
          <div className="h-40 flex items-center justify-center">
            <Doughnut data={doughnutData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { ...CHART_DEFAULTS, color: '#8888aa', padding: 12, boxWidth: 10 },
                },
              },
              cutout: '65%',
            }} />
          </div>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header">Recent Runs</h2>
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-accent" />
            <span className="text-xs text-text-muted font-mono">{data.recent_runs.length} runs</span>
          </div>
        </div>
        <div className="space-y-2">
          {data.recent_runs.map((run) => (
            <div key={run.id} className="flex items-center gap-4 px-4 py-3 bg-void/50 rounded-lg border border-border hover:border-accent/20 transition-colors">
              <div className="w-8 h-8 bg-accent-glow border border-accent/20 rounded-lg flex items-center justify-center">
                <Clock size={14} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs text-accent">{run.id}</div>
                <div className="text-xs text-text-muted">{run.timestamp}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="status-pass"><CheckCheck size={10} />{run.passed} pass</span>
                {run.failed > 0 && <span className="status-fail"><XOctagon size={10} />{run.failed} fail</span>}
                <span className="font-mono text-xs text-text-muted">{run.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
