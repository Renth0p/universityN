import { AxiosResponse } from 'axios';
import { setCookie } from 'nookies';

import { apiFetch } from '../axios/global';

const daysLive = 30 * 24 * 60 * 60;

async function UseRegisterForm(
    firstName: string,
    lastName: string,
    email: string,
    recordBook: string | number,
    password: string | number
): Promise<string> {
    try {
        const res: AxiosResponse<{ token: string }> = await apiFetch('/register', {
            method: 'post',
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                record_book: recordBook,
                password,
                password_confirmation: password,
            },
        });
        const { token } = res.data;
        setCookie(null, 'token', token, {
            maxAge: daysLive,
            path: '/',
        });
        return token;
    } catch (e) {
        console.error(e);
        return '';
    }
}

async function UseAuthForm(email: string, password: string | number): Promise<string> {
    try {
        const res: AxiosResponse<{ token: string }> = await apiFetch('/login', {
            method: 'post',
            data: {
                email,
                password,
            },
        });
        const { token } = res.data;
        setCookie(null, 'token', token, {
            maxAge: daysLive,
            path: '/',
        });
        return token;
    } catch (e) {
        console.error(e);
        return '';
    }
}

export { UseAuthForm, UseRegisterForm };
