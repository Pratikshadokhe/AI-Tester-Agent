import { Link } from 'react-router-dom';
import {
  Bot, FlaskConical, Play, FileBarChart2, Zap, ShieldCheck,
  Brain, BarChart3, CheckCircle2, ArrowRight, Sparkles,
  GitBranch, AlertTriangle, Clock, TrendingUp, Code2,
  ChevronRight, Star, Activity
} from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    color: 'accent',
    colorHex: '#7c6fff',
    title: 'AI-Powered Generation',
    desc: 'Paste a user story and watch the AI instantly generate comprehensive, edge-case-aware test cases covering auth, validation, security, and more.'
  },
  {
    icon: Play,
    color: 'neon',
    colorHex: '#0af5a8',
    title: 'Live Test Execution',
    desc: 'Execute your entire test suite with one click. Watch a live terminal log stream results step-by-step with millisecond-level timing.'
  },
  {
    icon: BarChart3,
    color: 'sky',
    colorHex: '#38d9f5',
    title: 'Deep Analytics',
    desc: 'Track pass/fail trends over time with interactive charts, risk scoring, and category breakdowns across every test run.'
  },
  {
    icon: AlertTriangle,
    color: 'gold',
    colorHex: '#ffcd3c',
    title: 'Regression Alerts',
    desc: 'Automatically detect when previously passing tests begin to fail. Get instant alerts with severity levels and contextual diffs.'
  },
  {
    icon: ShieldCheck,
    color: 'pink',
    colorHex: '#f562ff',
    title: 'Risk Scoring',
    desc: 'Every test suite gets a composite risk score based on failures, severity, and historical patterns — so you know exactly where to focus.'
  },
  {
    icon: Code2,
    color: 'warn',
    colorHex: '#ff5757',
    title: 'FastAPI Integration',
    desc: 'Seamlessly hooks into your existing FastAPI backend via clean REST endpoints. Just run your server and the agent handles the rest.'
  },
];

const STEPS = [
  { n: '01', icon: FlaskConical, color: '#7c6fff', title: 'Write a User Story', desc: 'Describe your feature in plain English — title and description is all you need.' },
  { n: '02', icon: Sparkles, color: '#0af5a8', title: 'Generate Test Cases', desc: 'The AI agent analyzes your story and produces a full test suite with priorities and steps.' },
  { n: '03', icon: Play, color: '#38d9f5', title: 'Execute & Monitor', desc: 'Hit Execute and watch every test run live with a streaming log and progress bar.' },
  { n: '04', icon: FileBarChart2, color: '#ffcd3c', title: 'Review Reports', desc: 'Analyze results, view failure screenshots, and track regressions in the Reports dashboard.' },
];

const STATS = [
  { value: '10×', label: 'Faster test creation', icon: Zap, color: '#7c6fff' },
  { value: '98%', label: 'Edge case coverage', icon: ShieldCheck, color: '#0af5a8' },
  { value: '<1s', label: 'Generation time', icon: Clock, color: '#38d9f5' },
  { value: '∞', label: 'Scalable test runs', icon: TrendingUp, color: '#ffcd3c' },
];

function GlowOrb({ cx, cy, color, size = 300, opacity = 0.12 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: cx, top: cy,
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: 'translate(-50%, -50%)',
        filter: 'blur(40px)',
      }}
    />
  );
}

function FeatureCard({ icon: Icon, color, colorHex, title, desc }) {
  return (
    <div className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 cursor-default"
      style={{ '--hover-color': colorHex }}>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{ background: `${colorHex}18`, border: `1px solid ${colorHex}30` }}
      >
        <Icon size={20} style={{ color: colorHex }} />
      </div>
      <h3 className="font-display font-bold text-base text-white mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ n, icon: Icon, color, title, desc, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
          style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
        >
          {n}
        </div>
        {!isLast && <div className="w-px flex-1 mt-3" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />}
      </div>
      <div className="pb-8 pt-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Icon size={14} style={{ color }} />
          <h3 className="font-display font-semibold text-white text-sm">{title}</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-void text-white overflow-x-hidden">
      {/* ── Topbar ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c6fff, #0af5a8)' }}>
            <Bot size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-sm tracking-tight">AI Tester Agent</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded-full ml-1"
            style={{ background: '#7c6fff22', color: '#7c6fff', border: '1px solid #7c6fff33' }}>v2.0</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[['Features', '#features'], ['How It Works', '#how'], ['Stats', '#stats']].map(([label, href]) => (
            <a key={label} href={href}
              className="px-3 py-1.5 text-sm font-body text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all">
              {label}
            </a>
          ))}
        </nav>

        <Link to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-semibold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #7c6fff, #5b52dd)', boxShadow: '0 0 20px rgba(124,111,255,0.3)' }}>
          Open Dashboard <ArrowRight size={14} />
        </Link>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background orbs */}
        <GlowOrb cx="15%" cy="30%" color="#7c6fff" size={500} opacity={0.18} />
        <GlowOrb cx="85%" cy="60%" color="#0af5a8" size={400} opacity={0.12} />
        <GlowOrb cx="50%" cy="80%" color="#f562ff" size={350} opacity={0.08} />

        {/* Grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,111,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

        {/* Animated badge */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-mono text-xs"
            style={{ background: 'rgba(10,245,168,0.1)', border: '1px solid rgba(10,245,168,0.25)', color: '#0af5a8' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            AI-Powered · FastAPI Backend · Real-time Execution
          </div>

          <h1 className="font-display font-extrabold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.08 }}>
            <span className="text-white">Test Smarter,</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #7c6fff 0%, #f562ff 50%, #0af5a8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Ship Faster.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            <span className="text-white font-medium">AI Tester Agent</span> turns user stories into full test suites in seconds.
            Generate, execute, and analyze tests — all in one intelligent dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-display font-bold text-base text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #7c6fff, #5b52dd)', boxShadow: '0 0 30px rgba(124,111,255,0.35)' }}>
              <Zap size={18} />
              Launch Dashboard
              <ChevronRight size={16} />
            </Link>
            <Link to="/generate"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-display font-semibold text-base transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#e0e0ff' }}>
              <FlaskConical size={18} />
              Try Generator
            </Link>
          </div>

          {/* Floating mini-cards */}
          <div className="mt-16 grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {[
              { label: 'Tests generated', val: '2,847', color: '#7c6fff' },
              { label: 'Pass rate', val: '94.2%', color: '#0af5a8' },
              { label: 'Avg gen time', val: '0.8s', color: '#ffcd3c' },
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-display font-bold text-xl" style={{ color }}>{val}</div>
                <div className="text-xs text-text-secondary font-mono mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs font-mono">scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section id="stats" className="py-16 relative">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="font-display font-extrabold text-3xl mb-1" style={{ color }}>{value}</div>
                <div className="text-sm text-text-secondary font-body">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features" className="py-20 relative">
        <GlowOrb cx="90%" cy="50%" color="#f562ff" size={400} opacity={0.1} />

        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 font-mono text-xs"
              style={{ background: 'rgba(124,111,255,0.12)', border: '1px solid rgba(124,111,255,0.25)', color: '#7c6fff' }}>
              <Star size={10} />  FEATURES
            </div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              Everything you need to{' '}
              <span style={{ color: '#7c6fff' }}>test at scale</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              From generation to reporting — the full testing lifecycle, supercharged by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section id="how" className="py-20 relative">
        <GlowOrb cx="10%" cy="60%" color="#0af5a8" size={350} opacity={0.1} />

        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 font-mono text-xs"
              style={{ background: 'rgba(10,245,168,0.1)', border: '1px solid rgba(10,245,168,0.25)', color: '#0af5a8' }}>
              <GitBranch size={10} />  WORKFLOW
            </div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              From story to report in{' '}
              <span style={{ color: '#0af5a8' }}>4 steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0 max-w-3xl mx-auto">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} {...step} isLast={i === STEPS.length - 1 || i === STEPS.length - 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pages Preview ─────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              Four powerful <span style={{ color: '#ffcd3c' }}>pages</span>
            </h2>
            <p className="text-text-secondary text-lg">Each page is purpose-built for a stage of your testing workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: '/dashboard', icon: BarChart3, color: '#7c6fff', label: 'Dashboard', desc: 'Metrics, charts, trends, and recent run history at a glance.' },
              { to: '/generate', icon: FlaskConical, color: '#0af5a8', label: 'Generate Tests', desc: 'Input a user story and generate a full test suite instantly.' },
              { to: '/execution', icon: Play, color: '#38d9f5', label: 'Execution', desc: 'Run tests live with a streaming log, progress bar, and step details.' },
              { to: '/reports', icon: FileBarChart2, color: '#ffcd3c', label: 'Reports', desc: 'Full analytics, failure screenshots, and regression alerts.' },
            ].map(({ to, icon: Icon, color, label, desc }) => (
              <Link to={to} key={to}
                className="rounded-2xl p-5 group hover:scale-105 transition-all duration-300 cursor-pointer block"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}25` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-white text-sm mb-2">{label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-xs font-display font-semibold transition-all group-hover:gap-2" style={{ color }}>
                  Open <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <GlowOrb cx="50%" cy="50%" color="#7c6fff" size={600} opacity={0.12} />
        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <div className="rounded-3xl p-12"
            style={{ background: 'rgba(124,111,255,0.08)', border: '1px solid rgba(124,111,255,0.2)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #7c6fff, #0af5a8)' }}>
              <Bot size={26} className="text-white" />
            </div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              Ready to test smarter?
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Launch the dashboard and start generating test cases from your user stories in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-base text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c6fff, #5b52dd)', boxShadow: '0 0 40px rgba(124,111,255,0.4)' }}>
                <Zap size={18} />
                Launch Dashboard
              </Link>
              <Link to="/generate"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-semibold text-base transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#e0e0ff' }}>
                <FlaskConical size={18} />
                Generate Tests
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="py-8 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c6fff, #0af5a8)' }}>
              <Bot size={12} className="text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white">AI Tester Agent</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
            <Activity size={10} className="text-neon" />
            <span style={{ color: '#0af5a8' }}>All systems operational</span>
            <span className="ml-2">· Built with React + FastAPI</span>
          </div>
          <div className="flex gap-4 text-xs text-text-muted font-body">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/generate" className="hover:text-white transition-colors">Generate</Link>
            <Link to="/reports" className="hover:text-white transition-colors">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
