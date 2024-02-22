import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'shared/const/url.ts';
import Cookies from 'js-cookie';
import { refetchAccessTokenForPrepareHeaders } from 'app/api/handlers/refetchAccessTokenForPrepareHeaders.ts';

export const fetchFavorites = createApi({
    reducerPath: 'fetchFavorites',
    tagTypes: ['Favorites'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/`,
        credentials: 'include',
        prepareHeaders: refetchAccessTokenForPrepareHeaders //перед обращением к эндпоинту обновляем accessToken
    }),
    endpoints: (build) => ({
        getFavorites: build.query<number[], number | string>({
            query: (page = '') => ({
                url: `api/favorites/${page ? `?page=${page}` : ''}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Favorites'],
        }),
        addFavorite: build.mutation<{ id: number }, { id: number }>({
            query: (body) => ({
                url: 'api/favorites/',
                method: 'POST',
                headers: { 'X-Csrftoken': `${Cookies.get('access_token')}` },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        deleteFromFavorites: build.mutation<'', { id: number }>({
            query: (body) => ({
                url: 'api/favorites/delete_favorite/',
                method: 'POST',
                headers: { 'X-Csrftoken': `${Cookies.get('access_token')}` },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        clearFavorites: build.mutation<'', ''>({
            query: () => ({
                url: 'api/favorites/clear_favorite/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                },
            }),
            invalidatesTags: ['Favorites'],
        }),
    }),
});

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useClearFavoritesMutation,
} = fetchFavorites;
