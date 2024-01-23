import { url } from 'shared/const/url.ts';
import { saveTokensAuthToCookie } from '../../../../../../app/cookie/cookieAuth.ts';
import { UserEnter } from '../libr/RegistrationTypes';

export const signIn = async (body: UserEnter) => {
    try {
        const responce = await fetch(`${url}/api/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (responce.status === 401) return responce;
        const data = await responce.json(); //для ошибки неверного логина или пароля

        if ((await responce).ok) {
            /* if (localStorage.getItem('rememberMe') == 'true') { */
            saveTokensAuthToCookie(data.access, data.refresh);
            /* } else {
                sessionStorage.setItem('accessToken', data.access);
                sessionStorage.setItem('refreshToken', data.refresh);
            } */
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};
