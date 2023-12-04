import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LastAdvertsTypes } from './types/lastAdvertsTypes';
import { url } from '../../shared/const/url';

export const fetchFavorites = createApi({
    reducerPath: 'fetchFavorites',
    tagTypes: ['Favorites'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getFavorites: build.query<LastAdvertsTypes[], string>({
            query: () => '/api/favorites/',
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
        addFavorite: build.mutation<LastAdvertsTypes[], LastAdvertsTypes>({
            query: (body) => ({
                url: 'api/favorites/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Favorites'],
        }),
    }),
});

export const { useGetFavoritesQuery } = fetchFavorites;
