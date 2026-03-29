import { useLocation } from 'react-router-dom';
import { Bell, Search, Settings, RefreshCw } from 'lucide-react';

const PAGE_LABELS = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/generate': 'Generate Tests',
  '/execution': 'Execution',
  '/reports': 'Reports',
};

export default function Navbar({ onRefresh, isLoading }) {
  const location = useLocation();
  const title = PAGE_LABELS[location.pathname] || 'AI Tester Agent';

  return (
    <header className="sticky top-0 h-14 bg-surface/90 border-b border-border z-30 flex items-center px-6 gap-4 w-full"
      style={{ backdropFilter: 'blur(12px)' }}>
      {/* Page title */}
      <div className="flex-1">
        <h1 className="font-display font-semibold text-base text-text-primary tracking-tight">{title}</h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-lg px-3 py-1.5 w-52">
        <Search size={13} className="text-text-muted" />
        <input
          type="text"
          placeholder="Search tests..."
          className="bg-transparent text-sm text-text-secondary placeholder-text-muted outline-none w-full font-body"
        />
        <kbd className="font-mono text-xs text-text-muted bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} className={isLoading ? 'animate-spin text-accent' : ''} />
        </button>

        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors relative">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-warn rounded-full" />
        </button>

        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors">
          <Settings size={15} />
        </button>

        <div className="ml-2 w-7 h-7 rounded-full bg-gradient-to-br from-accent to-neon flex items-center justify-center text-xs font-display font-bold text-white">
          AT
        </div>
      </div>
    </header>
  );
}
