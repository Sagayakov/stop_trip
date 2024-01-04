import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'shared/const/url.ts';
import Cookies from 'js-cookie';
import { RatingType } from './types/ratingType';

export const fetchRating = createApi({
    reducerPath: 'fetchRating',
    tagTypes: ['Rating'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getRating: build.query<RatingType, string>({
            query: () => ({
                url: 'api/user_rate/',
                method: 'GET',
                credentials: 'include',
            }),
        }),
        changeRating: build.mutation<{ id: number }, { id: number }>({
            query: (body) => ({
                url: 'api/user_rate/change_rate/',
                method: 'POST',
                headers: { 'X-Csrftoken': `${Cookies.get('access_token')}` },
                body,
            }),
            invalidatesTags: ['Rating'],
        }),
    }),
});

export const { useGetRatingQuery, useChangeRatingMutation } = fetchRating;
