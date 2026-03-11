import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ResultCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'accent', className = '' }) {
  const colorMap = {
    accent: { bg: 'bg-accent-glow', border: 'border-accent/20', icon: 'text-accent', text: 'text-accent' },
    neon:   { bg: 'bg-neon-dim',    border: 'border-neon/20',   icon: 'text-neon',   text: 'text-neon' },
    warn:   { bg: 'bg-warn-dim',    border: 'border-warn/20',   icon: 'text-warn',   text: 'text-warn' },
    gold:   { bg: 'bg-gold/10',     border: 'border-gold/20',   icon: 'text-gold',   text: 'text-gold' },
  };
  const c = colorMap[color] || colorMap.accent;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-neon' : trend === 'down' ? 'text-warn' : 'text-text-muted';

  return (
    <div className={`metric-card group cursor-default ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 ${c.bg} border ${c.border} rounded-lg flex items-center justify-center`}>
          {Icon && <Icon size={16} className={c.icon} />}
        </div>
        {trendValue !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-mono ${trendColor}`}>
            <TrendIcon size={12} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className={`font-display font-bold text-2xl ${c.text} mb-0.5 tracking-tight`}>
        {value}
      </div>
      <div className="font-body text-sm text-text-secondary">{title}</div>
      {subtitle && (
        <div className="font-mono text-xs text-text-muted mt-1">{subtitle}</div>
      )}
    </div>
  );
}
