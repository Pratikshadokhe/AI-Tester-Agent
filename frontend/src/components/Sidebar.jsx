import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FlaskConical, Play, FileBarChart2,
  Bot, ChevronRight, Activity, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/generate', icon: FlaskConical, label: 'Generate Tests' },
  { to: '/execution', icon: Play, label: 'Execution' },
  { to: '/reports', icon: FileBarChart2, label: 'Reports' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-surface border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center relative overflow-hidden">
            <Bot size={16} className="text-white relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-neon opacity-80" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-text-primary leading-tight">AI Tester</div>
            <div className="font-mono text-xs text-text-muted leading-tight">Agent v2.0</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 mt-3 px-2 py-1.5 bg-neon-dim rounded-md border border-neon/15">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-slow" />
          <span className="font-mono text-xs text-neon">AGENT ACTIVE</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="label px-2 mb-3">Navigation</p>
        {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent-glow text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={12} className="text-accent opacity-60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom stats */}
      <div className="px-3 pb-4 border-t border-border pt-4 space-y-2">
        <div className="glass-card p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted font-mono">CPU</span>
            <div className="flex items-center gap-1">
              <Activity size={10} className="text-neon" />
              <span className="text-xs text-neon font-mono">23%</span>
            </div>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-neon rounded-full" style={{ width: '23%' }} />
          </div>
        </div>
        <div className="glass-card p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted font-mono">Runs today</span>
            <div className="flex items-center gap-1">
              <Zap size={10} className="text-accent" />
              <span className="text-xs text-accent font-mono">12</span>
            </div>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
