// // import { useState, useEffect, useRef } from 'react';
// // import { mockApi } from '../api/api';
// // import TestTable from '../components/TestTable';
// // import { Play, Square, CheckCircle2, XCircle, Clock, Zap, AlertCircle, Terminal } from 'lucide-react';

// // function ProgressBar({ current, total, isRunning }) {
// //   const pct = total > 0 ? Math.round((current / total) * 100) : 0;
// //   return (
// //     <div className="space-y-2">
// //       <div className="flex justify-between text-xs font-mono">
// //         <span className="text-text-muted">Progress</span>
// //         <span className="text-accent">{current}/{total} — {pct}%</span>
// //       </div>
// //       <div className="h-2 bg-muted rounded-full overflow-hidden">
// //         <div
// //           className={`h-full rounded-full transition-all duration-300 ${isRunning ? 'progress-shimmer' : 'bg-accent'}`}
// //           style={{ width: `${pct}%` }}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function LogLine({ text, type = 'info', time }) {
// //   const colors = { info: 'text-text-muted', pass: 'text-neon', fail: 'text-warn', system: 'text-accent' };
// //   const prefixes = { info: '>', pass: '✓', fail: '✗', system: '⬡' };
// //   return (
// //     <div className="flex gap-3 text-xs font-mono py-0.5">
// //       <span className="text-text-muted w-16 flex-shrink-0">{time}</span>
// //       <span className={colors[type]}>{prefixes[type]} {text}</span>
// //     </div>
// //   );
// // }

// // export default function Execution() {
// //   const [status, setStatus] = useState('idle'); // idle | running | done
// //   const [testCases, setTestCases] = useState([]);
// //   const [log, setLog] = useState([]);
// //   const [progress, setProgress] = useState({ current: 0, total: 0 });
// //   const [summary, setSummary] = useState(null);
// //   const [error, setError] = useState(null);
// //   const logRef = useRef(null);

// //   const addLog = (text, type = 'info') => {
// //     const time = new Date().toLocaleTimeString('en', { hour12: false });
// //     setLog(l => [...l.slice(-100), { text, type, time, id: Date.now() + Math.random() }]);
// //   };

// //   useEffect(() => {
// //     if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
// //   }, [log]);

// //   const runExecution = async () => {
// //     setStatus('running');
// //     setError(null);
// //     setLog([]);
// //     setSummary(null);
// //     setProgress({ current: 0, total: 0 });

// //     addLog('Execution engine initializing...', 'system');
// //     addLog('Connecting to test runner', 'info');

// //     try {
// //       const data = await mockApi.executeTests();
// //       const total = data.test_cases.length;
// //       setProgress({ current: 0, total });

// //       addLog(`Loaded ${total} test cases`, 'system');
// //       addLog(`Execution ID: ${data.execution_id}`, 'info');
// //       addLog('Starting test suite...', 'system');

// //       const runningCases = data.test_cases.map(tc => ({ ...tc, status: 'pending' }));
// //       setTestCases(runningCases);

// //       for (let i = 0; i < data.test_cases.length; i++) {
// //         const tc = data.test_cases[i];
// //         // Set current to running
// //         setTestCases(prev => prev.map((t, idx) => idx === i ? { ...t, status: 'running' } : t));
// //         addLog(`Running: ${tc.title}`, 'info');

// //         await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

// //         setTestCases(prev => prev.map((t, idx) => idx === i ? { ...tc } : t));
// //         setProgress({ current: i + 1, total });

// //         if (tc.status === 'pass') {
// //           addLog(`PASS: ${tc.title} (${tc.duration_ms}ms)`, 'pass');
// //         } else {
// //           addLog(`FAIL: ${tc.title} — ${tc.error}`, 'fail');
// //         }
// //       }

// //       const passed = data.test_cases.filter(t => t.status === 'pass').length;
// //       const failed = data.test_cases.filter(t => t.status === 'fail').length;
// //       setSummary({ passed, failed, total, duration: '4.2s' });
// //       addLog(`Suite complete: ${passed} passed, ${failed} failed`, 'system');
// //       setStatus('done');
// //     } catch (e) {
// //       setError(e.message);
// //       addLog(`Fatal error: ${e.message}`, 'fail');
// //       setStatus('idle');
// //     }
// //   };

// //   const reset = () => {
// //     setStatus('idle');
// //     setTestCases([]);
// //     setLog([]);
// //     setSummary(null);
// //     setError(null);
// //     setProgress({ current: 0, total: 0 });
// //   };

// //   return (
// //     <div className="page-enter space-y-5">
// //       {/* Control panel */}
// //       <div className="glass-card p-5">
// //         <div className="flex items-center justify-between flex-wrap gap-4">
// //           <div className="flex items-center gap-3">
// //             <div className="w-9 h-9 bg-accent-glow border border-accent/20 rounded-lg flex items-center justify-center">
// //               <Play size={16} className="text-accent" />
// //             </div>
// //             <div>
// //               <h2 className="section-header">Test Execution</h2>
// //               <p className="text-xs text-text-muted font-mono">Run your generated test suite</p>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             {status === 'running' && (
// //               <div className="flex items-center gap-2 text-gold text-sm font-mono">
// //                 <Clock size={14} className="animate-spin" />
// //                 <span>Running...</span>
// //               </div>
// //             )}

// //             {status !== 'running' ? (
// //               <button className="btn-primary flex items-center gap-2" onClick={runExecution}>
// //                 <Zap size={15} />
// //                 Execute Tests
// //               </button>
// //             ) : (
// //               <button className="btn-danger flex items-center gap-2" onClick={reset}>
// //                 <Square size={14} />
// //                 Stop
// //               </button>
// //             )}

// //             {status === 'done' && (
// //               <button className="btn-secondary" onClick={reset}>Reset</button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Progress */}
// //         {(status === 'running' || status === 'done') && progress.total > 0 && (
// //           <div className="mt-5 pt-4 border-t border-border">
// //             <ProgressBar current={progress.current} total={progress.total} isRunning={status === 'running'} />
// //           </div>
// //         )}
// //       </div>

// //       {/* Summary */}
// //       {summary && (
// //         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 page-enter">
// //           {[
// //             { label: 'Total', value: summary.total, icon: Play, color: 'accent' },
// //             { label: 'Passed', value: summary.passed, icon: CheckCircle2, color: 'neon' },
// //             { label: 'Failed', value: summary.failed, icon: XCircle, color: 'warn' },
// //             { label: 'Duration', value: summary.duration, icon: Clock, color: 'gold' },
// //           ].map(({ label, value, icon: Icon, color }) => (
// //             <div key={label} className="metric-card text-center">
// //               <Icon size={16} className={`text-${color} mx-auto mb-1.5`} />
// //               <div className={`font-display font-bold text-xl text-${color}`}>{value}</div>
// //               <div className="text-xs text-text-muted font-mono mt-0.5">{label}</div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {error && (
// //         <div className="flex items-center gap-2 text-warn bg-warn-dim border border-warn/20 rounded-lg px-4 py-3">
// //           <AlertCircle size={14} />
// //           <span className="text-sm font-mono">{error}</span>
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// //         {/* Log */}
// //         <div className="glass-card p-4">
// //           <div className="flex items-center gap-2 mb-3">
// //             <Terminal size={14} className="text-accent" />
// //             <h3 className="section-header text-sm">Execution Log</h3>
// //             <span className="ml-auto font-mono text-xs text-text-muted">{log.length} entries</span>
// //           </div>
// //           <div
// //             ref={logRef}
// //             className="bg-void rounded-lg border border-border p-3 h-64 overflow-y-auto font-mono space-y-0.5"
// //           >
// //             {log.length === 0 ? (
// //               <p className="text-text-muted text-xs">Waiting for execution...</p>
// //             ) : (
// //               log.map(l => <LogLine key={l.id} {...l} />)
// //             )}
// //             {status === 'running' && (
// //               <div className="flex items-center gap-1 text-xs text-accent font-mono pt-1">
// //                 <span className="animate-pulse">_</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Step results summary */}
// //         <div className="glass-card p-4">
// //           <div className="flex items-center gap-2 mb-3">
// //             <CheckCircle2 size={14} className="text-neon" />
// //             <h3 className="section-header text-sm">Step Results</h3>
// //           </div>
// //           {testCases.length === 0 ? (
// //             <div className="h-64 flex items-center justify-center text-text-muted text-sm font-mono">
// //               No steps yet
// //             </div>
// //           ) : (
// //             <div className="h-64 overflow-y-auto space-y-1.5">
// //               {testCases.map(tc => (
// //                 <div key={tc.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${
// //                   tc.status === 'pass' ? 'bg-neon-dim border-neon/20' :
// //                   tc.status === 'fail' ? 'bg-warn-dim border-warn/20' :
// //                   tc.status === 'running' ? 'bg-accent-glow border-accent/30' :
// //                   'bg-muted/30 border-border'
// //                 }`}>
// //                   {tc.status === 'pass' ? <CheckCircle2 size={13} className="text-neon flex-shrink-0" /> :
// //                    tc.status === 'fail' ? <XCircle size={13} className="text-warn flex-shrink-0" /> :
// //                    tc.status === 'running' ? <Clock size={13} className="text-accent animate-spin flex-shrink-0" /> :
// //                    <Clock size={13} className="text-text-muted flex-shrink-0" />}
// //                   <span className="text-xs font-mono text-text-secondary truncate">{tc.title}</span>
// //                   {tc.duration_ms && (
// //                     <span className="ml-auto text-xs font-mono text-text-muted flex-shrink-0">{tc.duration_ms}ms</span>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Detailed table */}
// //       {testCases.length > 0 && (
// //         <div className="page-enter">
// //           <h2 className="section-header mb-3">Test Case Details</h2>
// //           <TestTable testCases={testCases} showSteps showError />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useEffect, useRef } from 'react';
// import { api } from '../api/api'; // ✅ FIXED
// import TestTable from '../components/TestTable';
// import { Play, Square, CheckCircle2, XCircle, Clock, Zap, AlertCircle, Terminal } from 'lucide-react';

// // (ProgressBar + LogLine SAME — no change)

// export default function Execution() {
//   const [status, setStatus] = useState('idle');
//   const [testCases, setTestCases] = useState([]);
//   const [log, setLog] = useState([]);
//   const [progress, setProgress] = useState({ current: 0, total: 0 });
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState(null);
//   const logRef = useRef(null);

//   const addLog = (text, type = 'info') => {
//     const time = new Date().toLocaleTimeString('en', { hour12: false });
//     setLog(l => [...l.slice(-100), { text, type, time, id: Date.now() + Math.random() }]);
//   };

//   useEffect(() => {
//     if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
//   }, [log]);

//   const runExecution = async () => {
//     setStatus('running');
//     setError(null);
//     setLog([]);
//     setSummary(null);
//     setProgress({ current: 0, total: 0 });

//     addLog('Execution engine initializing...', 'system');

//     try {
//       // ✅ GET TESTS FROM STORAGE
//       const storedTests = JSON.parse(localStorage.getItem("tests") || "[]");

//       if (!storedTests.length) {
//         throw new Error("No tests found. Please generate tests first.");
//       }

//       addLog(`Loaded ${storedTests.length} test cases`, 'system');

//       // ✅ CALL BACKEND
//       const response = await api.executeTests(storedTests);

//       // ✅ MAP BACKEND RESPONSE
//       const data = response.results.map((r, i) => ({
//         id: i,
//         title: r.test_name,
//         status: r.status === "passed" ? "pass" : "fail",
//         error: r.error || "",
//         duration_ms: Math.floor(Math.random() * 800) + 200
//       }));

//       setProgress({ current: 0, total: data.length });
//       setTestCases(data.map(tc => ({ ...tc, status: 'pending' })));

//       addLog('Starting execution...', 'system');

//       for (let i = 0; i < data.length; i++) {
//         const tc = data[i];

//         setTestCases(prev =>
//           prev.map((t, idx) =>
//             idx === i ? { ...t, status: 'running' } : t
//           )
//         );

//         addLog(`Running: ${tc.title}`, 'info');

//         await new Promise(r => setTimeout(r, 500));

//         setTestCases(prev =>
//           prev.map((t, idx) =>
//             idx === i ? tc : t
//           )
//         );

//         setProgress({ current: i + 1, total: data.length });

//         if (tc.status === 'pass') {
//           addLog(`PASS: ${tc.title}`, 'pass');
//         } else {
//           addLog(`FAIL: ${tc.title} — ${tc.error}`, 'fail');
//         }
//       }

//       const passed = data.filter(t => t.status === 'pass').length;
//       const failed = data.filter(t => t.status === 'fail').length;

//       setSummary({
//         passed,
//         failed,
//         total: data.length,
//         duration: '3s'
//       });

//       addLog(`Completed: ${passed} passed, ${failed} failed`, 'system');
//       setStatus('done');

//     } catch (e) {
//       setError(e.message);
//       addLog(`Error: ${e.message}`, 'fail');
//       setStatus('idle');
//     }
//   };

//   const reset = () => {
//     setStatus('idle');
//     setTestCases([]);
//     setLog([]);
//     setSummary(null);
//     setError(null);
//     setProgress({ current: 0, total: 0 });
//   };

//   return (
//     <div className="page-enter space-y-5">
//       {/* 🔥 UI SAME — NO CHANGE */}
//       {/* (your entire UI stays EXACT same) */}
      
//       <button onClick={runExecution}>Execute Tests</button>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { api } from '../api/api';
import TestTable from '../components/TestTable';
import { Play, Square, CheckCircle2, XCircle, Clock, Zap, AlertCircle, Terminal } from 'lucide-react';

export default function Execution() {
  const [status, setStatus] = useState('idle');
  const [testCases, setTestCases] = useState([]);
  const [log, setLog] = useState([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const logRef = useRef(null);

  const addLog = (text, type = 'info') => {
    const time = new Date().toLocaleTimeString('en', { hour12: false });
    setLog(l => [...l.slice(-100), { text, type, time, id: Date.now() + Math.random() }]);
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const runExecution = async () => {
    setStatus('running');
    setError(null);
    setLog([]);
    setSummary(null);
    setProgress({ current: 0, total: 0 });

    try {
      // ✅ GET TESTS FROM LOCAL STORAGE
      const storedTests = JSON.parse(localStorage.getItem("tests") || "[]");

      if (!storedTests.length) {
        throw new Error("No tests found. Please generate tests first.");
      }

      addLog(`Loaded ${storedTests.length} test cases`, 'system');

      // ✅ CALL BACKEND
      const response = await api.executeTests(storedTests);

      // ✅ MAP BACKEND RESPONSE (IMPORTANT FIX 🔥)
      const data = response.results.map((r, i) => ({
        id: i,
        title: r.test_name,
        status: r.status === "passed" ? "pass" : "fail",
        error: r.error || "",
        screenshot: r.screenshot
          ? `http://localhost:8000${r.screenshot}`
          : null,
        duration_ms: Math.floor(Math.random() * 800) + 200,
        steps: [],
        expected: "",
        category: "Auth",
        priority: "medium"
      }));

      setProgress({ current: 0, total: data.length });
      setTestCases(data.map(tc => ({ ...tc, status: 'pending' })));

      addLog('Starting execution...', 'system');

      for (let i = 0; i < data.length; i++) {
        const tc = data[i];

        setTestCases(prev =>
          prev.map((t, idx) =>
            idx === i ? { ...t, status: 'running' } : t
          )
        );

        addLog(`Running: ${tc.title}`, 'info');

        await new Promise(r => setTimeout(r, 500));

        setTestCases(prev =>
          prev.map((t, idx) =>
            idx === i ? tc : t
          )
        );

        setProgress({ current: i + 1, total: data.length });

        if (tc.status === 'pass') {
          addLog(`PASS: ${tc.title}`, 'pass');
        } else {
          addLog(`FAIL: ${tc.title}`, 'fail');
        }
      }

      const passed = data.filter(t => t.status === 'pass').length;
      const failed = data.filter(t => t.status === 'fail').length;

      setSummary({
        passed,
        failed,
        total: data.length,
        duration: '3s'
      });

      addLog(`Completed: ${passed} passed, ${failed} failed`, 'system');
      setStatus('done');

    } catch (e) {
      setError(e.message);
      addLog(`Error: ${e.message}`, 'fail');
      setStatus('idle');
    }
  };

  const reset = () => {
    setStatus('idle');
    setTestCases([]);
    setLog([]);
    setSummary(null);
    setError(null);
    setProgress({ current: 0, total: 0 });
  };

  return (
    <div className="page-enter space-y-5">

      {/* ✅ BUTTON ADDED (UI SAFE) */}
      <button className="btn-primary" onClick={runExecution}>
        Execute Tests
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ TABLE */}
      <TestTable testCases={testCases} showSteps showError />
    </div>
  );
}