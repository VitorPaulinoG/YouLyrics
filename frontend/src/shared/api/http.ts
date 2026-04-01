import axios from 'axios';
import { environment } from '@/shared/config/environment';
import { ensureFreshToken } from '@/shared/lib/auth/keycloak';

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
