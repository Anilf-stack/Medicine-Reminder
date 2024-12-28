import API from './api';

export const login = async (email: string, password: string) => {
    const response = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await API.post('/auth/register', { name, email, password });
    return response.data;
};