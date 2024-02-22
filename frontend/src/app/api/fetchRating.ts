import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'shared/const/url.ts';
import Cookies from 'js-cookie';
import { AddRating, RatingType } from './types/ratingTypes';
import { refetchAccessTokenForPrepareHeaders } from 'app/api/handlers/refetchAccessTokenForPrepareHeaders.ts';

export const fetchRating = createApi({
    reducerPath: 'fetchRating',
    tagTypes: ['Rating'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/`,
        prepareHeaders: refetchAccessTokenForPrepareHeaders //перед обращением к эндпоинту обновляем accessToken
    }),
    endpoints: (build) => ({
        getRating: build.query<RatingType, number | string>({
            query: (page = '') => ({
                url: `api/user_rate/${page ? `?page=${page}` : ''}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
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
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                },
                body,
            }),
            invalidatesTags: ['Rating'],
        }),
    }),
});

export const { useGetRatingQuery, useChangeRatingMutation } = fetchRating;
