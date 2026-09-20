import { User, Opportunity, RecommendationResponse } from '../types/index.js';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('life_passport_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Registration failed');
  return json;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}

export async function fetchProfile(): Promise<User> {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch profile');
  return json;
}

export async function updateProfile(data: Partial<User>): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to update profile');
  return json;
}

export async function fetchAIRecommendations(): Promise<RecommendationResponse[]> {
  const res = await fetch(`${API_BASE}/recommendations`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to generate recommendations');
  return json;
}

export async function fetchAllOpportunities(params?: { category?: string; status?: string; search?: string }): Promise<Opportunity[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.status) query.append('status', params.status);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE}/opportunities?${query.toString()}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch opportunities');
  return json;
}

export async function fetchOpportunityById(id: string): Promise<Opportunity> {
  const res = await fetch(`${API_BASE}/opportunities/${id}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch opportunity details');
  return json;
}
