export const TOKEN_KEY = '&app_token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (response) => {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem('role', response.role);
    localStorage.setItem('name', response.name);
    localStorage.setItem('email', response.email);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
};

export const ROLE = localStorage.getItem('role');
export const NAME = localStorage.getItem('name');
export const E_MAIL = localStorage.getItem('email');
