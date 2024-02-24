import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'app/api/handlers/baseQueryWithReauth.ts';
import { getCsrfToken } from 'app/api/handlers/getCsrfToken.ts';

export const fetchFavorites = createApi({
    reducerPath: 'fetchFavorites',
    tagTypes: ['Favorites'],
    baseQuery: baseQueryWithReauth,
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
                headers: {
                    "X-Csrftoken": getCsrfToken(),
                    // 'X-Csrftoken': `${Cookies.get('access_token')}`
                },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        deleteFromFavorites: build.mutation<'', { id: number }>({
            query: (body) => ({
                url: 'api/favorites/delete_favorite/',
                method: 'POST',
                headers: {
                    "X-Csrftoken": getCsrfToken(),
                    // 'X-Csrftoken': `${Cookies.get('access_token')}`
                },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        clearFavorites: build.mutation<'', ''>({
            query: () => ({
                url: 'api/favorites/clear_favorite/',
                method: 'POST',
                headers: {
                    "X-Csrftoken": getCsrfToken(),
                    // 'X-Csrftoken': `${Cookies.get('access_token')}`,
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
