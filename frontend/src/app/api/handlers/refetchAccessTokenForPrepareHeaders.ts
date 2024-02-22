import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { url } from 'shared/const/url.ts';
import { saveTokensAuthToCookie } from 'app/cookie/cookieAuth.ts';

export const refetchAccessTokenForPrepareHeaders = async (headers: Headers) => {
    if(localStorage.getItem('isAuth')){
        const { refreshToken } = getTokensFromStorage();
        const response = await fetch(`${url}/api/auth/jwt/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });
        if (response.ok) {
            const data = await response.json();
            saveTokensAuthToCookie(data.access);
            localStorage.setItem("isAuth", 'true')
            headers.set('Authorization', `Bearer ${data.access}`);
        }
    }
    return headers;
}