import { Dispatch } from '@reduxjs/toolkit';
import { saveTokensAuthToCookie } from 'app/cookie/cookieAuth.ts';
import { setIsAuth } from 'features/header/model/modalAuth/reducers/auth.ts';
import { getTokensFromStorage } from './getTokensFromStorage';

export const checkAuthentication = async (dispatch: Dispatch) => {
    const { accessToken, refreshToken } = getTokensFromStorage();
    const isAuth = localStorage.getItem('isAuth');
    const url = import.meta.env.VITE_BASE_URL;
    const headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    if(accessToken){
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
            }
        } catch (error) {
            console.log(error);
        }
    }
    if(!accessToken && isAuth && refreshToken){
        try {
            const response = await fetch(`${url}/api/auth/jwt/refresh/`, {
                method: 'POST',
                headers: headersConfig,
                body: JSON.stringify({ refresh: refreshToken }),
            });
            if(response.ok){
                const data = await response.json();
                dispatch(setIsAuth(true))
                localStorage.setItem('isAuth', 'true')
                saveTokensAuthToCookie(data.access);
            }else {
                localStorage.removeItem('isAuth')
            }
        } catch (error) {
            console.log(error);
        }
    }

};
