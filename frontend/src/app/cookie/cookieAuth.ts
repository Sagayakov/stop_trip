import Cookies from 'js-cookie'

export const saveTokensAuthToCookie = ( accessToken?: string, refreshToken?: string ) => {
    if (accessToken) Cookies.set('access_token', accessToken, { expires: 1/100 }); //срок действия в днях
    if (refreshToken) Cookies.set('refresh_token', refreshToken, { expires: 15 }); //хранить в httpOnly cookie (хз как передать в тело запроса, чтобы получить новый access)
};
/*
1/1440 - 1 минута
1/100 - 14 минут 24 секунды
1/950 - 1 минута 30 секунд
*/

export const getTokensAuthFromCookies = () => {
    const accessToken = Cookies.get('access_token') || '';
    const refreshToken = Cookies.get('refresh_token') || '';
    return { accessToken, refreshToken };
};

export const clearTokensFromCookies = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
};