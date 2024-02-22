import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'shared/const/url';
import { AddMessengerType, MessengersType } from './types/messengers';
import Cookies from 'js-cookie';
import { Messenger } from 'pages/advertPage/libr/types';
import { refetchAccessTokenForPrepareHeaders } from 'app/api/handlers/refetchAccessTokenForPrepareHeaders.ts';

export const fetchMessengers = createApi({
    reducerPath: 'fetchMessengers',
    tagTypes: ['Messengers'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/`,
        credentials: 'include',
        prepareHeaders: refetchAccessTokenForPrepareHeaders //перед обращением к эндпоинту обновляем accessToken
    }),
    endpoints: (build) => ({
        getMessengers: build.query<Messenger[], string>({
            query: () => ({
                url: `api/messengers/all_messengers`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Messengers'],
        }),
        getUserMessengers: build.query<MessengersType, string>({
            query: (page = '') => ({
                url: `api/messengers/${page ? `?page=${page}` : ''}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Messengers'],
        }),
        addMessenger: build.mutation<
            AddMessengerType,
            { body: AddMessengerType }
        >({
            query: ({ body }) => ({
                url: '/api/messengers/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        updateMessenger: build.mutation<
            AddMessengerType,
            { body: AddMessengerType; id: string | number }
        >({
            query: ({ body, id }) => ({
                url: `/api/messengers/${id}`,
                method: 'PUT',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        modifyMessenger: build.mutation<
            AddMessengerType,
            { body: { link_to_user: string }; id: string | number }
        >({
            query: ({ body, id }) => ({
                url: `/api/messengers/${id}`,
                method: 'PATCH',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        deleteMessenger: build.mutation<null, { id: string | number }>({
            query: ({ id }) => ({
                url: `/api/messengers/${id}`,
                method: 'DELETE',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Messengers'],
        }),
    }),
});

export const {
    useGetMessengersQuery,
    useGetUserMessengersQuery,
    useAddMessengerMutation,
    useUpdateMessengerMutation,
    useModifyMessengerMutation,
    useDeleteMessengerMutation,
} = fetchMessengers;
