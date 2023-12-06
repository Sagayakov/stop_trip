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

        if (res.ok) {
            dispatch(setIsAuth(true));
            localStorage.setItem('isAuth', 'true')
        } else {
            try {
                const response = await fetch(`${url}/api/auth/jwt/refresh/`, {
                    method: 'POST',
                    headers: headersConfig,
                    body: JSON.stringify({ refresh: refreshToken }),
                });
                if(response.ok){
                    const data = await response.json();
                    await dispatch(setIsAuth(true))
                    localStorage.setItem('isAuth', 'true')
                    if (localStorage.getItem('rememberMe')) {
                        saveTokensAuthToCookie(data.access);
                    } else {
                        sessionStorage.setItem('accessToken', data.access);
                    }
                }else {
                    localStorage.removeItem('isAuth')
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
