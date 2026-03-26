import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ResultCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'accent', className = '' }) {
  const colorMap = {
    accent: { bg: 'bg-accent-glow', border: 'border-accent/20', icon: 'text-accent', colorHex: '#7c6fff' },
    neon:   { bg: 'bg-neon-dim',    border: 'border-neon/20',   icon: 'text-neon',   colorHex: '#0af5a8' },
    warn:   { bg: 'bg-warn-dim',    border: 'border-warn/20',   icon: 'text-warn',   colorHex: '#ff5757' },
    gold:   { bg: 'bg-gold/10',     border: 'border-gold/20',   icon: 'text-gold',   colorHex: '#ffcd3c' },
  };
  const c = colorMap[color] || colorMap.accent;
  const { colorHex } = c;

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

      <div className={`font-display font-bold text-2xl mb-0.5 tracking-tight`} style={{ color: colorHex }}>
        {value}
      </div>
      <div className="font-body text-sm" style={{ color: '#c8c8e8' }}>{title}</div>
      {subtitle && (
        <div className="font-mono text-xs mt-1" style={{ color: '#7070a0' }}>{subtitle}</div>
      )}
    </div>
  );
}
