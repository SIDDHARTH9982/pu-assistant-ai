import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pu_token');
      localStorage.removeItem('pu_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
