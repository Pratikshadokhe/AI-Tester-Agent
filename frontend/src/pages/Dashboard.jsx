import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title,
  Tooltip, Legend, ArcElement
} from 'chart.js';
import { api } from '../api/api';
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
          style={{ transform: `translateX(-50%) rotate(${deg - 90}deg)`, background: color }}>
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
    api.getDashboard().then(d => {  
      setData(d);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="h-64 flex items-center justify-center">No Data</div>;

  const barData = {
    labels: data.trend?.map(d => d.label) || [],
    datasets: [
      {
        label: 'Passed',
        data: data.trend?.map(d => d.passed) || [],
        backgroundColor: 'rgba(0,245,160,0.6)',
      },
      {
        label: 'Failed',
        data: data.trend?.map(d => d.failed) || [],
        backgroundColor: 'rgba(255,107,107,0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(data.categories || {}),
    datasets: [{
      data: Object.values(data.categories || {}),
    }],
  };

  const passRate = data.total_tests
    ? ((data.passed / data.total_tests) * 100).toFixed(1)
    : 0;

  return (
    <div className="page-enter space-y-6">
      {/* SAME UI */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <ResultCard title="Total Tests" value={data.total_tests} icon={TestTube2} />
        <ResultCard title="Passed" value={data.passed} icon={CheckCheck}
          subtitle={`${passRate}% pass rate`} />
        <ResultCard title="Failed" value={data.failed} icon={XOctagon} />
        <div className="metric-card flex items-center justify-center">
          <RiskGauge score={data.risk_score || 0} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="h-52">
            <Bar data={barData} />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="h-40">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        {data.recent_runs?.map(run => (
          <div key={run.id} className="flex justify-between py-2">
            <span>{run.id}</span>
            <span>{run.passed} / {run.failed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}