import { setIsAuth } from 'features/header/model/modalAuth/reducers/auth.ts';
import { saveTokensAuthToCookie } from 'app/cookie/cookieAuth.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { url } from 'shared/const/url';

export const getAccessTokenWithRefresh = async (
    dispatch: Dispatch,
    refreshToken: string
) => {
    const headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    try {
        const response = await fetch(`${url}/api/auth/jwt/refresh/`, {
            method: 'POST',
            headers: headersConfig,
            body: JSON.stringify({ refresh: refreshToken }),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setIsAuth(true));
            localStorage.setItem('isAuth', 'true');
            saveTokensAuthToCookie(data.access);
        } else {
            localStorage.removeItem('isAuth');
        }
    } catch (error) {
        console.log(error);
    }
};
