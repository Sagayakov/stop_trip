import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Owner } from './types/lastAdvertsTypes';
import { url } from 'shared/const/url.ts';

export const fetchSeller = createApi({
    reducerPath: 'fetchSeller',
    tagTypes: ['Seller'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/`,
       
    }),
    endpoints: (build) => ({
        getSeller: build.query<Owner, number>({
            query: (id) => `api/user/${id}`,
        }),
    }),
});

export const { useGetSellerQuery } = fetchSeller;
