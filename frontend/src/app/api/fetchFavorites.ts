import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LastAdvertsTypes } from './types/lastAdvertsTypes';
import { url } from '../../shared/const/url';

export const fetchFavorites = createApi({
    reducerPath: 'fetchFavorites',
    tagTypes: ['Favorites'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getFavorites: build.query<LastAdvertsTypes[], string>({
            query: () => ({
                url: 'api/favorites/',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Favorites' as const,
                              id,
                          })),
                          { type: 'Favorites', id: 'LIST' },
                      ]
                    : [{ type: 'Favorites', id: 'LIST' }],
        }),
        addFavorite: build.mutation<{ id: number }, { id: number }>({
            query: (body) => ({
                url: 'api/favorites/',
                method: 'POST',
                headers: { 'X-Csrftoken': `${sessionStorage.getItem('accessToken')}` },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        deleteFromFavorites: build.mutation<'', { id: number }>({
            query: (body) => ({
                url: 'api/favorites/delete_favorite/',
                method: 'POST',
                headers: { 'X-Csrftoken': `${sessionStorage.getItem('accessToken')}` },
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
        clearFavorites: build.mutation<'', ''>({
            query: () => ({
                url: 'api/favorites/clear_favorite/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': `${sessionStorage.getItem('accessToken')}`,
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
