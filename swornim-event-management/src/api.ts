const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9009/api/v1';

export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
} 