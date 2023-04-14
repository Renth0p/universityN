import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
    baseURL: 'https://api.meatballs.w6p.ru/api',
});

const apiFetch = axios.create({
    baseURL: 'https://api.meatballs.w6p.ru/api',
    headers: {
        Accept: 'application/json',
    },
});

const setAuthToken = () => {
    const cookies = parseCookies();
    const { token } = cookies;

    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};

const getProfile = async (): Promise<boolean> => {
    setAuthToken();
    const response = await api.get('/profile');
    return response.data as boolean;
};

export { api, apiFetch, getProfile };
