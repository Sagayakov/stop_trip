import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { url } from 'shared/const/url.ts';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';

const baseQuery = fetchBaseQuery({
    baseUrl: `${url}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (getState().setIsEnter.isEnter && localStorage.getItem('isAuth')) {
            const { accessToken } = getTokensFromStorage();
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        }
    },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        const { refreshToken } = getTokensFromStorage();
        await getAccessTokenWithRefresh(api.dispatch, refreshToken);
        result = await baseQuery(args, api, extraOptions)
    }

    return result
}

