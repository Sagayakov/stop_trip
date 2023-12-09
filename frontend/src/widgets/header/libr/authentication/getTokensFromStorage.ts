import { getTokensAuthFromCookies } from '../../../../app/cookie/cookieAuth';

export const getTokensFromStorage = () => {
    /* const rememberMe =
        'true' === localStorage.getItem('rememberMe') ? true : false; */
    const accessToken = /* rememberMe */
        /* ? */ getTokensAuthFromCookies().accessToken
        /* : sessionStorage.getItem('accessToken'); */
    const refreshToken = /* rememberMe */
        /* ? */ getTokensAuthFromCookies().refreshToken
        /* : sessionStorage.getItem('refreshToken'); */

    return { accessToken, refreshToken };
};
