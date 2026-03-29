import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GenerateTests from './pages/GenerateTests';
import Execution from './pages/Execution';
import Reports from './pages/Reports';
import {Toaster} from 'react-hot-toast'

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/home';

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  if (isHome) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen grid-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '224px' }}>
        <Navbar onRefresh={handleRefresh} isLoading={isLoading} />
        <main className="flex-1 pt-14">
          <div className="p-6 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard key={location.pathname} />} />
              <Route path="/generate" element={<GenerateTests key={location.pathname} />} />
              <Route path="/execution" element={<Execution key={location.pathname} />} />
              <Route path="/reports" element={<Reports key={location.pathname} />} />
            </Routes>
          </div>
        </main>
      </div>

      <Toaster position="top-center" reverseOrder={false}  toastOptions={{
            // Default options for all toasts
            style: {
              border: "1px solid #4ade80",
              padding: "16px",
              color: "#F9FAFB",
              background: "#1E1F2E",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              icon: "✅",
              style: {
                border: "1px solid #22c55e",
                background: "#1E1F2E",
                color: "#22C55E",
              },
            },
            error: {
              icon: "❌",
              style: {
                border: "1px solid #ef4444",
                background: "#1E1F2E",
                color: "#EF4444",
              },
            },
            duration: 1000, // 4 seconds
          }}
        />
    </div>
  );
}
