import { Dispatch } from '@reduxjs/toolkit';
import { saveTokensAuthToCookie } from '../../../../app/cookie/cookieAuth';
import { setIsAuth } from '../../../../features/header/model/modalAuth/reducers/auth';
import { getTokensFromStorage } from './getTokensFromStorage';

export const checkAuthentication = async (dispatch: Dispatch) => {
    const { accessToken, refreshToken } = getTokensFromStorage();
    const url = import.meta.env.VITE_BASE_URL;
    const headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    try {
        //если токена нет, вернет статус 401
        const res = await fetch(`${url}/api/auth/jwt/verify/`, {
            method: 'POST',
            headers: headersConfig,
            body: JSON.stringify({ token: accessToken }),
        });
        console.log(res)
        if (res.ok) {
            dispatch(setIsAuth(true));
        } else {
            console.log('401, пошел за новым access');
            try {
                const response = await fetch(`${url}/api/auth/jwt/refresh/`, {
                    method: 'POST',
                    headers: headersConfig,
                    body: JSON.stringify({ refresh: refreshToken }),
                });
                const data = await response.json();
                dispatch(setIsAuth(true));
                if (localStorage.getItem('rememberMe')) {
                    saveTokensAuthToCookie(data.access);
                    console.log('сохранил токен в куки');
                } else {
                    sessionStorage.setItem('accessToken', data.access);
                    console.log('сохранил токен в сешн сторадж');
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
