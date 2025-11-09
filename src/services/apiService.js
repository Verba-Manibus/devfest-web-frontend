

const API_BASE = process.env.REACT_APP_API_BASE || '';

export async function fetchTranslateSample() {
  // Example placeholder for a GET endpoint
  const url = `${API_BASE}/api/sample`;
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export default {
  fetchTranslateSample,
};
