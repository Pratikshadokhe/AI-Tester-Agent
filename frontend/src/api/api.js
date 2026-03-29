const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// toggle for demo
const USE_MOCK = true;


async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // ✅ Generate Tests
  generateTests: (payload) =>
    request('/generate-tests', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Execute Tests (FIXED RESPONSE FORMAT)
    executeTests: (issueKey) =>
    request('/execute-tests', {
      method: 'POST',
      body: JSON.stringify({ jira_id: issueKey }),
    }),

  // ✅ Fetch Jira Issue
  fetchJiraIssue: (issueKey) =>
    request('/generate-tests', {
      method: 'POST',
      body: JSON.stringify({ jira_id: issueKey }),
    }),

  // ✅ Dashboard (mock if toggle true)
  getDashboard: async () => {
    if (USE_MOCK) return mockApi.getDashboard();
    return request('/dashboard');
  },

  // ✅ Reports (mock if toggle true)
  getReports: async () => {
    if (USE_MOCK) return mockApi.getReports();
    return request('/reports');
  },

  // ✅ NEW: Run directly from JIRA
  runFromJira: async (issueKey) => {
    if (USE_MOCK) return mockApi.executeTests();

    const res = await request('/run-from-jira', {
      method: 'POST',
      body: JSON.stringify({ issue_key: issueKey }),
    });

    return res;
    
  },

  // getReports: () => request('/reports'),
  // getDashboard: () => request('/dashboard'),
};

// ---------------- MOCK ----------------
// ---------------- MOCK FOR DASHBOARD / REPORTS ----------------
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const mockApi = {
  getDashboard: async () => {
    await delay(500);
    return {
      total_tests: 11,
      passed: 8,
      failed: 3,
      risk_score: 72,
      trend: [
        { label: 'Mon', passed: 5, failed: 1 },
        { label: 'Tue', passed: 7, failed: 2 },
        { label: 'Wed', passed: 6, failed: 3 },
      ],
      categories: { functional: 4, validation: 1, integration: 6 },
      recent_runs: [
        { id: 'exec_001', timestamp: '2026-03-29 14:32', passed: 8, failed: 3, duration: '5.2s' },
        { id: 'exec_002', timestamp: '2026-03-28 09:15', passed: 9, failed: 2, duration: '4.8s' },
      ],
    };
  },

  getReports: async () => {
    await delay(600);
    return {
      total: 11,
      passed: 8,
      failed: 3,
      skipped: 0,
      pass_rate: 72.7,
      risk_score: 72,
      history: [
      { date: '2026-03-27', passed: 3, failed: 2 },
      { date: '2026-03-28', passed: 5, failed: 1 },
      { date: '2026-03-29', passed: 8, failed: 3 },
    ],
      regression_alerts: [
        { id: 'RA-001', message: 'TC-003 regressed from last run', severity: 'high', detected_at: new Date().toISOString() },
      ],
      test_cases: [
        { id: 'TC-001', title: 'Valid BOQ Generation', category: 'functional', priority: 'low', status: 'pending' },
        { id: 'TC-002', title: 'Invalid Input Components Format', category: 'validation', priority: 'medium', status: 'pending' },
        { id: 'TC-003', title: 'Un-handled Error for Non-existent Catalogue Entries', category: 'integration', priority: 'high', status: 'pending' },
        { id: 'TC-004', title: 'Catastrophic Failure in BOQ Generation', category: 'integration', priority: 'critical', status: 'pending' },
        { id: 'TC-005', title: 'Precision Loss in Cost Calculation', category: 'functional', priority: 'medium', status: 'pending' },
        { id: 'TC-006', title: 'Lack of Version Control for Catalogue Database', category: 'integration', priority: 'high', status: 'pending' },
        { id: 'TC-007', title: 'Inability to Handle Large Volumes of Component Data', category: 'functional', priority: 'medium', status: 'pending' },
        { id: 'TC-008', title: 'Insufficient Logging for BOQ Generation Errors', category: 'integration', priority: 'low', status: 'pending' },
        { id: 'TC-009', title: 'Non-standardised Output Format', category: 'integration', priority: 'medium', status: 'pending' },
        { id: 'TC-010', title: 'Failure to Handle Multiple Units of Measurement', category: 'functional', priority: 'medium', status: 'pending' },
        { id: 'TC-011', title: 'Possible Security Vulnerability in Catalogue Database', category: 'integration', priority: 'high', status: 'pending' },
      ],
    };
  },
};