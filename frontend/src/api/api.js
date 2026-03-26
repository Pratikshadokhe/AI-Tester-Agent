const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  generateTests: (payload) =>
    request('/generate-tests', { method: 'POST', body: JSON.stringify(payload) }),

  executeTests: (payload) =>
    request('/execute-tests', { method: 'POST', body: JSON.stringify(payload || {}) }),

  fetchJiraIssue: (issueKey) =>
    request('/generate-tests', { method: 'POST', body: JSON.stringify({jira_id: issueKey})
  }),

  getReports: () =>
    request('/reports'),

  getDashboard: () =>
    request('/dashboard'),
};

// ── Mock helpers for standalone demo ──────────────────────────────────────────
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const MOCK_TEST_CASES = [
  { id: 'TC-001', title: 'User login with valid credentials', priority: 'critical', category: 'Auth', steps: ['Navigate to /login', 'Enter valid email', 'Enter valid password', 'Click Login'], expected: 'Redirected to dashboard', status: null },
  { id: 'TC-002', title: 'User login with invalid password', priority: 'high', category: 'Auth', steps: ['Navigate to /login', 'Enter valid email', 'Enter wrong password', 'Click Login'], expected: 'Error message shown', status: null },
  { id: 'TC-003', title: 'Password reset email flow', priority: 'high', category: 'Auth', steps: ['Click Forgot Password', 'Enter registered email', 'Submit form'], expected: 'Email sent confirmation', status: null },
  { id: 'TC-004', title: 'Form validation on empty submit', priority: 'medium', category: 'Validation', steps: ['Navigate to form', 'Leave all fields blank', 'Click Submit'], expected: 'Validation errors shown', status: null },
  { id: 'TC-005', title: 'Session expiry after inactivity', priority: 'medium', category: 'Security', steps: ['Login', 'Wait 30 min', 'Try to access protected page'], expected: 'Redirected to login', status: null },
  { id: 'TC-006', title: 'Rate limiting on login attempts', priority: 'low', category: 'Security', steps: ['Attempt login 5+ times with wrong credentials'], expected: 'Account locked message', status: null },
];

export const mockApi = {
  generateTests: async (payload) => {
    await delay(2200);
    return {
      story_title: payload.title,
      test_cases: MOCK_TEST_CASES.map(tc => ({ ...tc })),
      generated_at: new Date().toISOString(),
      risk_score: 68,
    };
  },

  executeTests: async () => {
    await delay(800);
    return {
      execution_id: `exec_${Date.now()}`,
      started_at: new Date().toISOString(),
      test_cases: MOCK_TEST_CASES.map((tc, i) => ({
        ...tc,
        status: i % 5 === 4 ? 'fail' : 'pass',
        duration_ms: Math.floor(Math.random() * 800) + 100,
        error: i % 5 === 4 ? 'AssertionError: Expected redirect but got 403' : null,
        screenshot: i % 5 === 4 ? `screenshot_${tc.id}.png` : null,
        steps_result: tc.steps.map((step, si) => ({
          step,
          status: (i % 5 === 4 && si === tc.steps.length - 1) ? 'fail' : 'pass',
          duration_ms: Math.floor(Math.random() * 200) + 20,
        })),
      })),
    };
  },

  getReports: async () => {
    await delay(600);
    return {
      total: 6,
      passed: 5,
      failed: 1,
      skipped: 0,
      pass_rate: 83.3,
      risk_score: 68,
      regression_alerts: [
        { id: 'RA-001', message: 'TC-005 regressed from last run', severity: 'high', detected_at: new Date().toISOString() },
      ],
      history: [
        { date: '2024-03-01', passed: 20, failed: 3 },
        { date: '2024-03-05', passed: 22, failed: 1 },
        { date: '2024-03-10', passed: 19, failed: 4 },
        { date: '2024-03-15', passed: 24, failed: 2 },
        { date: '2024-03-20', passed: 26, failed: 1 },
        { date: '2024-03-25', passed: 5, failed: 1 },
      ],
      test_cases: MOCK_TEST_CASES.map((tc, i) => ({
        ...tc,
        status: i % 5 === 4 ? 'fail' : 'pass',
        duration_ms: Math.floor(Math.random() * 800) + 100,
        error: i % 5 === 4 ? 'AssertionError: Expected redirect but got 403' : null,
        screenshot: i % 5 === 4 ? `https://via.placeholder.com/640x360/1a1a2e/6c63ff?text=Screenshot+${tc.id}` : null,
      })),
    };
  },

  getDashboard: async () => {
    await delay(500);
    return {
      total_tests: 6,
      passed: 5,
      failed: 1,
      risk_score: 68,
      trend: [
        { label: 'Mon', passed: 18, failed: 4 },
        { label: 'Tue', passed: 22, failed: 2 },
        { label: 'Wed', passed: 20, failed: 5 },
        { label: 'Thu', passed: 25, failed: 1 },
        { label: 'Fri', passed: 23, failed: 3 },
        { label: 'Sat', passed: 28, failed: 1 },
        { label: 'Sun', passed: 5, failed: 1 },
      ],
      categories: { Auth: 3, Validation: 1, Security: 2 },
      recent_runs: [
        { id: 'exec_001', timestamp: '2024-03-25 14:32', passed: 5, failed: 1, duration: '4.2s' },
        { id: 'exec_002', timestamp: '2024-03-24 09:15', passed: 6, failed: 0, duration: '3.8s' },
        { id: 'exec_003', timestamp: '2024-03-23 16:44', passed: 4, failed: 2, duration: '5.1s' },
      ],
    };
  },
};
