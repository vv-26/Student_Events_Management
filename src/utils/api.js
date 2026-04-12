// src/utils/api.js
// REST API helpers — connect to Java Servlet backend
// Base URL: update BASE_URL to match your servlet deployment

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/StudentEventManager";

/**
 * Generic fetch wrapper with error handling
 */
async function request(endpoint, options = {}) {
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      // Server returned error status
      throw new Error(data.message || `Server error: ${res.status}`);
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Network error. Please try again." };
  }
}

/**
 * POST /register — Register a new faculty member
 * Payload: { name, email, password, department }
 */
export async function registerFaculty(payload) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /login — Authenticate faculty
 * Payload: { email, password }
 * Returns: { token, faculty: { id, name, email, department, role } }
 */
export async function loginFaculty(payload) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Save JWT token to localStorage (call after successful login)
 */
export function saveToken(token) {
  localStorage.setItem("sem_token", token);
}

/**
 * Get stored token
 */
export function getToken() {
  return localStorage.getItem("sem_token");
}

/**
 * Clear token on logout
 */
export function clearToken() {
  localStorage.removeItem("sem_token");
  localStorage.removeItem("sem_remember");
}
