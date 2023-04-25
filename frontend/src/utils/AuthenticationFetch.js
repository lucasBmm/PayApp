import { getToken } from './TokenService';

const authenticatedFetch = (url, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { ...options, headers });
};

export default authenticatedFetch;