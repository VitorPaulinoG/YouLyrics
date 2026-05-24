import axios from 'axios';
import { environment } from '@/config/environment';
import { ensureFreshToken } from '@/lib/keycloak';

export const http = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(async (config) => {
  const token = await ensureFreshToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
