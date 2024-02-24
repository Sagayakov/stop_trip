import { createApi } from '@reduxjs/toolkit/query/react';
import { AddRating, RatingType } from './types/ratingTypes';
import { baseQueryWithReauth } from 'app/api/handlers/baseQueryWithReauth.ts';
import { getCsrfToken } from 'app/api/handlers/getCsrfToken.ts';

export const fetchRating = createApi({
    reducerPath: 'fetchRating',
    tagTypes: ['Rating'],
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getRating: build.query<RatingType, number | string>({
            query: (page = '') => ({
                url: `api/user_rate/${page ? `?page=${page}` : ''}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Csrftoken": getCsrfToken(),
                    // 'X-Csrftoken': `${Cookies.get('access_token')}`,
                },
            }),
        }),
        changeRating: build.mutation<
            AddRating,
            { id: number; body: AddRating }
        >({
            query: ({ id, body }) => ({
                url: `api/user_rate/change_rate/?to_user=${id}`,
                method: 'POST',
                headers: {
                    "X-Csrftoken": getCsrfToken(),
                    // 'X-Csrftoken': `${Cookies.get('access_token')}`,
                },
                body,
            }),
            invalidatesTags: ['Rating'],
        }),
    }),
});

export const { useGetRatingQuery, useChangeRatingMutation } = fetchRating;
