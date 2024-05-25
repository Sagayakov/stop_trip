import { url } from 'shared/const/url.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchSearchAdverts = createApi({
    reducerPath: 'fetchSearchAdverts',
    tagTypes: ['fetchSearchAdverts'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/`,
    }),
    endpoints: (build) => ({
        getSearchAdverts: build.query({
            query: (searchText: string) => `api/advertisements/?search=${encodeURIComponent(searchText)}`,
            providesTags: ['fetchSearchAdverts'],
        }),
    }),
});

export const { useLazyGetSearchAdvertsQuery, useGetSearchAdvertsQuery } = fetchSearchAdverts;