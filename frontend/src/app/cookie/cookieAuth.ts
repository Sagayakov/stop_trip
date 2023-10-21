import Cookies from 'js-cookie'

export const saveTokensAuthToCookie = ( accessToken: string, refreshToken: string ) => {
    Cookies.set('access_token', accessToken, { expires: 1/100 }); //срок действия в днях
    Cookies.set('refresh_token', refreshToken, { expires: 15 }); // хранить в httpOnly cookie
};

export const getTokensAuthFromCookies = () => {
    const accessToken = Cookies.get('access_token') || '';
    const refreshToken = Cookies.get('refresh_token') || '';
    return { accessToken, refreshToken };
};

export const clearTokensFromCookies = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
};