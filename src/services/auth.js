export const TOKEN_KEY = '&app_token';
const ROLE = 'role';
const NAME = 'name';
const E_MAIL = 'email';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (response) => {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(ROLE, token);

};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
};
