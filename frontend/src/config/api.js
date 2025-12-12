// API Configuration
// Uses environment variable in production, localhost in development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const endpoints = {
    leetcode: (username) => `${API_URL}/api/leetcode/${username}`,
    projects: `${API_URL}/api/projects`,
    contact: `${API_URL}/api/contact`,
};
