import { getToken } from './TokenService';
import { useNavigate } from 'react-router-dom';

export const authenticatedFetch = async (url, options = {}) => {
  const token = getToken();
  if (!token) {
    return Promise.reject(new Error('No token found'));
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${url}`, { headers, ...options });
  if (!response.ok) {
    if (response.status === 401) {
      RedirectToLogin();
    }
    const error = await response.json();
    return Promise.reject(new Error(error.message));
  }

  return response;
};


const RedirectToLogin = () => {
  const navigate = useNavigate()
  navigate('/login');
};

export default authenticatedFetch;