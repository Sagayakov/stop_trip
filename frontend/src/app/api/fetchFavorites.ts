import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from 'app/api/handlers/baseQueryWithReauth.ts';
import { getCsrfToken } from 'app/api/handlers/getCsrfToken.ts';
import { AdvertsTypes } from './types/lastAdvertsTypes';

export const fetchFavorites = createApi({
    reducerPath: 'fetchFavorites',
    tagTypes: ['Favorites'],
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getFavorites: build.query<{id: number, advertisement: AdvertsTypes}[], string>({
            query: () => ({
                url: 'api/favorites/my_favorites/',
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Favorites'],
        }),
        getLikes: build.query<string[], string>({
            query: () => ({
                url: 'api/favorites/my_likes',
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Favorites'],
        }),
        addFavorite: build.mutation<{ advertisement: string }, { advertisement: string }>({
            query: (body) => ({
                url: 'api/favorites/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': getCsrfToken(),
                },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        deleteFavorite: build.mutation<null, { id: number }>({
            query: ({id}) => ({
                url: `api/favorites/${id}`,
                method: 'DELETE',
                headers: {
                    'X-Csrftoken': getCsrfToken(),
                }
            }),
            invalidatesTags: ['Favorites'],
        }),
    }),
});

export const {
    useGetFavoritesQuery,
    useGetLikesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation
} = fetchFavorites;
