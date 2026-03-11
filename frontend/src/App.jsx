import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import GenerateTests from './pages/GenerateTests';
import Execution from './pages/Execution';
import Reports from './pages/Reports';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  return (
    <div className="min-h-screen grid-bg">
      <Sidebar />
      <Navbar onRefresh={handleRefresh} isLoading={isLoading} />

      <main className="ml-56 pt-14 min-h-screen">
        <div className="p-6 max-w-6xl">
          <Routes>
            <Route path="/" element={<Dashboard key={location.pathname} />} />
            <Route path="/generate" element={<GenerateTests key={location.pathname} />} />
            <Route path="/execution" element={<Execution key={location.pathname} />} />
            <Route path="/reports" element={<Reports key={location.pathname} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
