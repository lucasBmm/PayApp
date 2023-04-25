const TOKEN_KEY = 'myapp_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const deleteToken = () => localStorage.removeItem(TOKEN_KEY);