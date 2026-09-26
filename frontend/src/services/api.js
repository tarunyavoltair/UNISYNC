const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Common API request function
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `API request failed with status ${response.status}`
    );
  }

  // Some requests may not return a response body
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// GET request
export async function get(endpoint) {
  return apiRequest(endpoint);
}

// POST request
export async function post(endpoint, data) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT request
export async function put(endpoint, data) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE request
export async function remove(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
}

export default {
  get,
  post,
  put,
  remove,
};